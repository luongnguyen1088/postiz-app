'use client';

import { FC, useState, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

interface BestTimeHeatmapProps {
  provider?: string;
  onSelectSlot?: (day: number, hour: number) => void;
  className?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

type Slot = { day: number; hour: number };
type Peak = readonly [hour: number, width: number, weight: number];

const DEFAULT_PEAKS: readonly Peak[] = [
  [9, 1.8, 34],
  [13.5, 1.6, 29],
  [19.5, 2, 48],
];

const PLATFORM_PEAKS: Record<string, readonly Peak[]> = {
  x: [
    [9, 1.8, 43],
    [13, 1.8, 38],
    [19, 2, 30],
  ],
  linkedin: [
    [10, 1.5, 65],
    [13, 1.5, 35],
    [17, 1.5, 15],
  ],
  facebook: [
    [9, 1.8, 36],
    [13.5, 1.8, 43],
    [19, 2, 43],
  ],
  instagram: [
    [9, 1.8, 24],
    [13.5, 1.8, 29],
    [20.5, 1.8, 64],
  ],
  tiktok: [
    [9, 1.8, 17],
    [14, 1.8, 25],
    [21, 1.8, 70],
  ],
  youtube: [
    [9, 1.8, 18],
    [14, 2, 36],
    [20, 2, 58],
  ],
};

const formatHour = (hour: number) =>
  `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`;

const formatTime = (hour: number) =>
  `${String(hour).padStart(2, '0')}:00`;

const getIntensityClass = (value: number) =>
  clsx({
    'bg-newBgColor/40': value < 20,
    'bg-purple-900/40 text-purple-200': value >= 20 && value < 40,
    'bg-purple-700/60 text-purple-100': value >= 40 && value < 60,
    'bg-btnPrimary/80 text-white': value >= 60 && value < 80,
    'bg-[#fc69ff] text-black font-bold shadow-[0_0_8px_rgba(252,105,255,0.4)]':
      value >= 80,
  });

export const BestTimeHeatmap: FC<BestTimeHeatmapProps> = ({
  provider,
  onSelectSlot,
  className,
}) => {
  const t = useT();
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null);

  const days = [
    t('heatmap_mon', 'Mon'),
    t('heatmap_tue', 'Tue'),
    t('heatmap_wed', 'Wed'),
    t('heatmap_thu', 'Thu'),
    t('heatmap_fri', 'Fri'),
    t('heatmap_sat', 'Sat'),
    t('heatmap_sun', 'Sun'),
  ];

  // Deterministic benchmark estimates; no random values or hydration differences.
  const matrix = useMemo(() => {
    const platform = provider?.trim().toLowerCase() || '';
    const peaks = PLATFORM_PEAKS[platform] || DEFAULT_PEAKS;

    const raw = DAYS.map((_, day) =>
      HOURS.map((hour) => {
        const weekend = day >= 5;
        let dayWeight = [0.9, 1.02, 1.08, 1.12, 1.02, 0.92, 0.86][day];

        if (platform === 'linkedin') {
          dayWeight = [0.9, 1.12, 1.18, 1.15, 0.82, 0.42, 0.38][day];
        } else if (
          ['instagram', 'tiktok', 'youtube'].includes(platform) &&
          weekend
        ) {
          dayWeight = day === 5 ? 1.2 : 1.14;
        }

        const peakIntensity = peaks.reduce(
          (total, [center, width, weight]) =>
            total +
            weight * Math.exp(-0.5 * ((hour - center) / width) ** 2),
          0
        );

        const overnightWeight = hour < 5 ? 0.45 : 1;
        return (8 + peakIntensity * dayWeight) * overnightWeight;
      })
    );

    const maximum = Math.max(...raw.flat());

    return raw.map((row) =>
      row.map((value) =>
        Math.max(0, Math.min(100, Math.round((value / maximum) * 100)))
      )
    );
  }, [provider]);

  const peakWindow = useMemo(() => {
    let best = { day: 0, hour: 0, score: -1 };

    matrix.forEach((row, day) => {
      for (let hour = 0; hour < 22; hour += 1) {
        const score = (row[hour] + row[hour + 1] + row[hour + 2]) / 3;
        if (score > best.score) {
          best = { day, hour, score };
        }
      }
    });

    return best;
  }, [matrix]);

  const handleSelectSlot = useCallback(
    (day: number, hour: number) => {
      window.dispatchEvent(
        new CustomEvent('open-new-post', { detail: { day, hour } })
      );
      onSelectSlot?.(day, hour);
    },
    [onSelectSlot]
  );

  return (
    <section
      className={clsx(
        'bg-newTableHeader border border-newTableBorder rounded-[16px] p-5 flex flex-col gap-4 text-newTextColor',
        className
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">
            {t('best_times_to_post', 'Best Times to Post')}
          </h3>
          <p className="mt-1 text-sm opacity-60">
            {t(
              'best_times_to_post_subtitle',
              'Optimal posting schedule based on engagement analytics'
            )}
          </p>
          <p className="mt-1 text-xs opacity-50">
            {t(
              'heatmap_benchmark_note',
              'Estimated from industry benchmarks; not measured account engagement. Days start on Monday.'
            )}
          </p>
        </div>

        <span className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-200">
          🔥 {t('heatmap_peak_window', 'Peak Window')}:{' '}
          {provider ? days[peakWindow.day] : days[3]}{' '}
          {provider ? formatTime(peakWindow.hour) : '19:00'} -{' '}
          {provider ? formatTime(peakWindow.hour + 2) : '21:00'}
          {!provider && (
            <>
              {' '}
              (+42% {t('heatmap_engagement', 'engagement')})
            </>
          )}
        </span>
      </header>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <div
            className="mb-2 grid items-center gap-1"
            style={{ gridTemplateColumns: '40px repeat(24, minmax(0, 1fr))' }}
          >
            <span aria-hidden="true" />
            {HOURS.map((hour) => (
              <span
                key={hour}
                className="overflow-visible whitespace-nowrap text-[10px] opacity-60"
              >
                {hour % 3 === 0 ? formatHour(hour) : ''}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            {matrix.map((row, day) => (
              <div
                key={DAYS[day]}
                className="grid items-center gap-1"
                style={{
                  gridTemplateColumns: '40px repeat(24, minmax(0, 1fr))',
                }}
              >
                <span className="text-xs opacity-70">{days[day]}</span>

                {row.map((intensity, hour) => {
                  const active =
                    activeSlot?.day === day && activeSlot.hour === hour;
                  const description = `${days[day]}, ${formatHour(hour)} — ${t(
                    'heatmap_engagement_index',
                    'Engagement index'
                  )}: ${intensity}/100. ${t(
                    'heatmap_click_to_schedule',
                    'Click to schedule'
                  )}`;

                  return (
                    <button
                      key={hour}
                      type="button"
                      aria-label={description}
                      title={description}
                      onMouseEnter={() => setActiveSlot({ day, hour })}
                      onMouseLeave={() => setActiveSlot(null)}
                      onFocus={() => setActiveSlot({ day, hour })}
                      onBlur={() => setActiveSlot(null)}
                      onClick={() => handleSelectSlot(day, hour)}
                      className={clsx(
                        'relative h-[22px] cursor-pointer rounded-[4px] transition-all hover:ring-2 hover:ring-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                        getIntensityClass(intensity),
                        active && 'z-10'
                      )}
                    >
                      <span className="sr-only">{description}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="min-h-[20px] text-xs opacity-75"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeSlot ? (
          <>
            {days[activeSlot.day]} · {formatHour(activeSlot.hour)} ·{' '}
            {t('heatmap_engagement_index', 'Engagement index')}:{' '}
            {matrix[activeSlot.day][activeSlot.hour]}/100 ·{' '}
            {t('heatmap_click_to_schedule', 'Click to schedule')}
          </>
        ) : (
          t('heatmap_hover_hint', 'Hover over a time slot to see its engagement index')
        )}
      </div>

      <div className="flex items-center justify-end gap-2 text-xs opacity-70">
        <span>{t('heatmap_less_active', 'Less active')}</span>
        <span
          aria-hidden="true"
          className="h-2.5 w-28 rounded-full"
          style={{
            background:
              'linear-gradient(to right, rgba(88,28,135,0.25), rgba(126,34,206,0.6), #8b5cf6, #fc69ff)',
          }}
        />
        <span>{t('heatmap_most_active', 'Most active')}</span>
      </div>
    </section>
  );
};
