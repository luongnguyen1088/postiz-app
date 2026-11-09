import React from 'react';
import { SocialLogoMark } from '@gitroom/frontend/components/ui/social-logo-mark';

export const LogoTextComponent = () => {
  return (
    <svg
      width="184"
      height="48"
      viewBox="0 0 245 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="social"
    >
      <SocialLogoMark />
      <text
        x="76"
        y="46"
        fill="currentColor"
        fontFamily="Arial, sans-serif"
        fontSize="48"
        fontWeight="700"
        letterSpacing="-2"
      >
        social
      </text>
    </svg>
  );
};
