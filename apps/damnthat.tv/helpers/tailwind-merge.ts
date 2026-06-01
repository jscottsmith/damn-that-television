import { extendTailwindMerge } from 'tailwind-merge';

/** Custom theme scales from styles/tailwind.css @theme */
export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        'sidemenu',
        '2xs',
        'xs',
        'sm',
        'base',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '10xl',
        '11xl',
        '12xl',
      ],
      shadow: ['hard', 'hard-xs', 'hard-sm'],
    },
  },
});
