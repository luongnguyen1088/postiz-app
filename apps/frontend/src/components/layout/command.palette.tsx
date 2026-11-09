'use client';

import { useState, useEffect, useMemo, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import useCookie from 'react-use-cookie';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { modeEmitter } from './mode.component';

export const openCommandPalette = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  }
};

export const CommandPalette = () => {
  const router = useRouter();
  const t = useT();
  const [, setMode] = useCookie('mode', 'dark');
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const label = useCallback(
    (key: string, fallback: string) => {
      const value = t(key, fallback);
      return typeof value === 'string' && value && value !== key
        ? value
        : fallback;
    },
    [t]
  );

  const close = useCallback(() => setIsOpen(false), []);

  const open = useCallback(() => {
    setQuery('');
    setActiveIndex(0);
    setIsOpen(true);
  }, []);

  const items = useMemo(() => {
    const quick = label('command_palette.quick_actions', 'Quick Actions');
    const navigation = label('command_palette.navigation', 'Navigation');
    const preferences = label('command_palette.preferences', 'Preferences');

    return [
      {
        id: 'create',
        category: quick,
        title: label('command_palette.create', 'Create New Post'),
        shortcut: 'C',
        run: () => {
          window.dispatchEvent(new CustomEvent('open-new-post'));
        },
      },
      {
        id: 'media',
        category: quick,
        title: label('command_palette.media', 'Open Media Library'),
        shortcut: 'M',
        run: () => router.push('/media'),
      },
      {
        id: 'launches',
        category: navigation,
        title: label('command_palette.launches', 'Calendar & Launches'),
        shortcut: 'L',
        run: () => router.push('/launches'),
      },
      {
        id: 'analytics',
        category: navigation,
        title: label('command_palette.analytics', 'Social Analytics'),
        shortcut: 'A',
        run: () => router.push('/analytics'),
      },
      {
        id: 'integrations',
        category: navigation,
        title: label('command_palette.integrations', 'Channel Integrations'),
        shortcut: undefined,
        run: () => router.push('/settings?tab=integrations'),
      },
      {
        id: 'settings',
        category: navigation,
        title: label('command_palette.settings', 'Workspace Settings'),
        shortcut: 'S',
        run: () => router.push('/settings'),
      },
      {
        id: 'billing',
        category: navigation,
        title: label('command_palette.billing', 'Billing & Plan'),
        shortcut: undefined,
        run: () => router.push('/billing'),
      },
      {
        id: 'theme',
        category: preferences,
        title: label(
          'command_palette.theme',
          'Toggle Theme (Dark / Light)'
        ),
        shortcut: 'T',
        run: () => {
          const root = document.documentElement;
          const dark =
            root.classList.contains('dark') ||
            document.body.classList.contains('dark');
          const mode = dark ? 'light' : 'dark';

          for (const element of [root, document.body]) {
            element.classList.remove('dark', 'light');
            element.classList.add(mode);
          }

          setMode(mode);
          modeEmitter.emit('mode', mode);
          window.dispatchEvent(
            new CustomEvent('theme-change', { detail: { theme: mode } })
          );
        },
      },
    ];
  }, [label, router, setMode]);

  const filtered = useMemo(() => {
    const words = query
      .trim()
      .toLocaleLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return items.filter((item) =>
      words.every((word) =>
        `${item.title} ${item.category}`.toLocaleLowerCase().includes(word)
      )
    );
  }, [items, query]);

  const selectedIndex = Math.min(
    activeIndex,
    Math.max(0, filtered.length - 1)
  );

  const execute = useCallback(
    (item: (typeof items)[number]) => {
      close();
      // Release the modal focus before opening another dialog or navigating.
      requestAnimationFrame(() => item.run());
    },
    [close]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.defaultPrevented) return;

      const target = event.target;
      const editing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          !!target.closest('input, textarea, select, [role="textbox"]'));

      const toggle =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k';

      const slash =
        event.key === '/' &&
        !editing &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey;

      if (toggle || slash) {
        event.preventDefault();

        if (!event.repeat) {
          if (isOpen) close();
          else open();
        }
      } else if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-command-palette', open);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-command-palette', open);
    };
  }, [isOpen, open, close]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    const keepFocus = (event: FocusEvent) => {
      if (event.target !== inputRef.current) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('focusin', keepFocus);

    return () => {
      document.removeEventListener('focusin', keepFocus);
      document.body.style.overflow = overflow;

      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      listRef.current
        ?.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, selectedIndex, filtered]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4 animate-fadeIn"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label('command_palette.title', 'Command palette')}
        className="w-full max-w-[620px] max-h-[80vh] bg-newBgColorInner border border-newBorder rounded-[16px] shadow-2xl overflow-hidden flex flex-col text-newTextColor"
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) return;

          if (event.key === 'Tab') {
            event.preventDefault();
            inputRef.current?.focus();
          }

          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();

            if (filtered.length) {
              setActiveIndex(
                (selectedIndex +
                  (event.key === 'ArrowDown' ? 1 : -1) +
                  filtered.length) %
                  filtered.length
              );
            }
          }

          if (event.key === 'Enter') {
            event.preventDefault();

            if (!event.repeat && filtered[selectedIndex]) {
              execute(filtered[selectedIndex]);
            }
          }
        }}
      >
        <input
          ref={inputRef}
          role="combobox"
          aria-label={label('command_palette.search', 'Search commands')}
          aria-expanded={true}
          aria-autocomplete="list"
          aria-controls={`${id}-results`}
          aria-activedescendant={
            filtered[selectedIndex]
              ? `${id}-${filtered[selectedIndex].id}`
              : undefined
          }
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          placeholder={label(
            'command_palette.placeholder',
            'Search actions, pages, and preferences…'
          )}
          className="w-full shrink-0 bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-textItemBlur border-b border-blockSeparator"
        />

        <div
          ref={listRef}
          id={`${id}-results`}
          role="listbox"
          aria-label={label('command_palette.results', 'Commands')}
          className="max-h-[360px] overflow-y-auto p-2 space-y-1"
        >
          {filtered.map((item, index) => (
            <div key={item.id} role="presentation">
              {(index === 0 ||
                filtered[index - 1].category !== item.category) && (
                <div
                  role="presentation"
                  className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-textItemBlur"
                >
                  {item.category}
                </div>
              )}

              <div
                id={`${id}-${item.id}`}
                role="option"
                aria-selected={selectedIndex === index}
                data-index={index}
                onMouseMove={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => execute(item)}
                className={clsx(
                  'flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer transition-colors text-[14px]',
                  selectedIndex === index
                    ? 'bg-boxHover text-newTextColor'
                    : 'text-newTextColor/90 hover:bg-boxHover'
                )}
              >
                <span>{item.title}</span>

                {item.shortcut && (
                  <kbd
                    aria-hidden="true"
                    className="px-2 py-0.5 text-[11px] rounded-[6px] bg-blockSeparator text-textItemBlur font-mono"
                  >
                    {item.shortcut}
                  </kbd>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            role="status"
            className="px-4 py-10 text-center text-[14px] text-textItemBlur"
          >
            {label(
              'command_palette.empty',
              'No commands found. Try another search.'
            )}
          </p>
        )}

        <div className="flex shrink-0 items-center justify-between border-t border-blockSeparator px-4 py-3 text-[11px] text-textItemBlur">
          <span>
            {label('command_palette.help', '↑ ↓ navigate · Enter select')}
          </span>
          <span>{label('command_palette.close', 'Esc to close')}</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
