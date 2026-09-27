import type { ReactNode } from 'react';

export type WorkHistoryJob = {
  company: string;
  role: string;
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  website?: string;
  start?: string;
  end?: string;
  present?: boolean;
  keywords?: string[];
  description?: ReactNode;
};

export interface WorkGroup {
  company: string;
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  website?: string;
  jobs: WorkHistoryJob[];
}

export function groupWorkHistory(jobs: WorkHistoryJob[]): WorkGroup[] {
  return jobs.reduce<WorkGroup[]>((groups, job, index) => {
    const previous = index > 0 ? jobs[index - 1] : undefined;
    const isNewCompany = !previous || previous.company !== job.company;

    if (isNewCompany) {
      groups.push({
        company: job.company,
        logo: job.logo,
        logoAlt: job.logoAlt,
        logoWidth: job.logoWidth,
        logoHeight: job.logoHeight,
        website: job.website,
        jobs: [job],
      });
      return groups;
    }

    groups[groups.length - 1]?.jobs.push(job);
    return groups;
  }, []);
}
