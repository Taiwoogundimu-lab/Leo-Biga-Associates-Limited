import { useState } from 'react';

interface LBALogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Displays the official uploaded LBA logo (/assets/leo-logo1.png) inside a high-contrast
 * architectural container. If the PNG asset has not yet been placed in public/assets/,
 * renders a faithful monochrome architectural LBA monogram preserving clean proportions.
 */
export function LBALogo({ variant = 'light', size = 'md' }: LBALogoProps) {
  const [imgError, setImgError] = useState(false);

  const dimensions =
    size === 'sm'
      ? 'h-11 px-2.5 py-1'
      : size === 'lg'
        ? 'h-16 px-3.5 py-2'
        : 'h-14 px-3 py-1.5';

  const containerStyle =
    variant === 'dark'
      ? 'bg-white border border-[#C5A46D]/60 text-[#202522]'
      : 'bg-white border border-[#123D35]/20 text-[#202522]';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-colors ${dimensions} ${containerStyle}`}
    >
      {!imgError ? (
        <img
          src="/assets/leo-logo1.png"
          alt="Leo Biga Associates Limited (LBA) official logo"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-auto object-contain"
        />
      ) : (
        <div className="flex items-center gap-2 select-none" aria-label="Leo Biga Associates Limited Logo">
          <svg
            viewBox="0 0 40 36"
            className={size === 'sm' ? 'h-5 w-auto' : size === 'lg' ? 'h-8 w-auto' : 'h-6 w-auto'}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="38" height="34" stroke="#123D35" strokeWidth="2" />
            <path d="M9 27V9H13.5V23.2H20V27H9Z" fill="#202522" />
            <path d="M22 9H28.5C30.8 9 32.2 10.3 32.2 12.4C32.2 14 31.3 15.1 29.9 15.5C31.6 15.9 32.6 17.2 32.6 19.1C32.6 21.6 31 23 28.4 23H22V9ZM25.4 14.3H27.9C28.8 14.3 29.4 13.8 29.4 13C29.4 12.1 28.8 11.7 27.9 11.7H25.4V14.3ZM25.4 20.3H28.2C29.2 20.3 29.8 19.8 29.8 18.8C29.8 17.8 29.2 17.3 28.2 17.3H25.4V20.3Z" fill="#202522" />
            <rect x="22" y="25" width="10.6" height="2" fill="#C5A46D" />
          </svg>
          <span className="font-display text-sm font-bold tracking-[0.14em] text-[#202522] leading-none">
            LBA
          </span>
        </div>
      )}
    </div>
  );
}
