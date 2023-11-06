import React from 'react';
import clsx from 'clsx';

export const EyeButton = (props: {
  isEyeActive: boolean;
  className?: string;
}) => {
  const { isEyeActive, className, ...rest } = props;

  return (
    <button
      className={clsx(
        props.className,
        'px-2.5 w-16 h-16 text-deep [&.is-selected]:bg-peach [&.is-selected]:shadow-hard',
        'hover:scale-[1.05] hover:shadow-hard hover:bg-cream',
        'transition-all duration-300',
        {
          ['is-selected']: props.isEyeActive,
        },
      )}
      {...rest}
    >
      <svg viewBox="0 0 200 268" fill="none">
        <path
          d="M192 192C192 167.6 182.307 144.2 165.054 126.946C147.8 109.693 124.4 100 100 100C75.6001 100 52.1995 109.693 34.9462 126.946C17.6928 144.2 8 167.6 8 192"
          stroke="currentColor"
          strokeWidth="15"
          className="transition-all"
          transform={props.isEyeActive ? 'translate(0 42)' : ''}
        />
        <path
          d="M8.00001 92C8.00001 116.4 17.6928 139.8 34.9462 157.054C52.1995 174.307 75.6001 184 100 184C124.4 184 147.8 174.307 165.054 157.054C182.307 139.8 192 116.4 192 92"
          stroke="currentColor"
          strokeWidth="15"
          className="transition-all"
          transform={props.isEyeActive ? 'translate(0 -42)' : ''}
        />
        <circle
          cx="100"
          cy="142"
          r="42"
          fill="currentColor"
          className="transition-all"
          transform={props.isEyeActive ? 'translate(0 -84)' : ''}
        />
      </svg>
    </button>
  );
};
