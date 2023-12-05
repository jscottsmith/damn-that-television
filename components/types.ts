export type NavLink = {
  href: string;
  label: string;
};

export type NavLinks = NavLink[];

/**
 * Statuses for the system that correspond to colors and icons
 */
export enum SystemStatus {
  /**
   * Green
   */
  success = 'success',
  /**
   * Yellow
   */
  warning = 'warning',
  /**
   * Red
   */
  danger = 'danger',
  /**
   * Blue
   */
  info = 'info',
}
