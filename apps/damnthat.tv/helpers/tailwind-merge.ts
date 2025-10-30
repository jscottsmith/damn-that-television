import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Support custom shadow
      shadow: [{ shadow: ['hard', 'hard-xs', 'hard-sm'] }],
    },
  },
});
