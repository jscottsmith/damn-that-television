'use client';

import { useEffect } from 'react';

export default function HashRoute() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);

      // Use a small delay to ensure the element is fully rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 1000);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return null;
}
