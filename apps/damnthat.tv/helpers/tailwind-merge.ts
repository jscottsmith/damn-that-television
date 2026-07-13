import { extendTailwindMerge } from 'tailwind-merge';

/** Custom theme scales from @workspace/ui tailwind theme */
export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      shadow: ['hard', 'hard-xs', 'hard-sm'],
    },
  },
});
