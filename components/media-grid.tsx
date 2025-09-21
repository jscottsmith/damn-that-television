interface MediaGridProps {
  columns: number;
  children: React.ReactNode;
}

// Map columns to complete Tailwind class names - moved outside component to prevent recreation
const desktopClassMap: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  8: 'lg:grid-cols-8',
  9: 'lg:grid-cols-9',
  10: 'lg:grid-cols-10',
  11: 'lg:grid-cols-11',
  12: 'lg:grid-cols-12',
};

/**
 * Component for rendering media items in a responsive grid layout.
 * Supports 1-12 columns with responsive breakpoints.
 */
export function MediaGrid({ columns, children }: MediaGridProps) {
  // Ensure columns is between 1 and 12
  const validColumns = Math.max(1, Math.min(12, columns));

  // Map columns to complete Tailwind class names
  const getGridClasses = () => {
    const baseClasses = 'grid gap-4';

    // Mobile: 1 column
    const mobileClasses = validColumns >= 2 ? 'grid-cols-2' : 'grid-cols-1';

    // Tablet: 2 columns (if columns >= 2)
    const tabletClasses = validColumns >= 2 ? 'md:grid-cols-2' : '';

    // Desktop: use the pre-defined class map
    const desktopClasses = desktopClassMap[validColumns] || 'lg:grid-cols-1';

    return `${baseClasses} ${mobileClasses} ${tabletClasses} ${desktopClasses}`;
  };

  return <div className={getGridClasses()}>{children}</div>;
}
