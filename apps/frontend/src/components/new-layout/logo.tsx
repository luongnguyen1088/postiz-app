'use client';

import { SocialLogoMark } from '@gitroom/frontend/components/ui/social-logo-mark';

export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 64 64"
      fill="none"
      className="mt-[8px] min-w-[60px] min-h-[60px]"
      role="img"
      aria-label="social"
    >
      <SocialLogoMark />
    </svg>
  );
};
