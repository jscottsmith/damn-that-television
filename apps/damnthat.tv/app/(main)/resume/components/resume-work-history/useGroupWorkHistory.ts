import { useMemo } from 'react';
import { asText } from '@prismicio/client';
import { createSlug } from 'helpers/create-slug';
import type { ResumeWorkHistorySliceDefaultItem } from '../../../../../prismicio-types';

interface WorkGroup {
  company: ResumeWorkHistorySliceDefaultItem['company'];
  company_logo: ResumeWorkHistorySliceDefaultItem['company_logo'];
  jobs: ResumeWorkHistorySliceDefaultItem[];
}

/**
 * Custom hook to group work history items by company
 *
 * @param items - Array of work history items from Prismic
 * @returns Array of grouped work history items
 */
export const useGroupedWorkHistory = (
  items: ResumeWorkHistorySliceDefaultItem[],
): WorkGroup[] => {
  return useMemo(() => {
    return items.reduce<WorkGroup[]>((groups, item, i) => {
      const currentCompanyText = asText(item.company);
      const previousCompanyText = i > 0 ? asText(items[i - 1].company) : '';
      const isNewCompany =
        i === 0 || currentCompanyText !== previousCompanyText;

      if (isNewCompany) {
        groups.push({
          company: item.company,
          company_logo: item.company_logo,
          jobs: [item],
        });
      } else {
        // Add to existing group
        const lastGroup = groups[groups.length - 1];
        lastGroup.jobs.push(item);
      }

      return groups;
    }, []);
  }, [items]);
};
