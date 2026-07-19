import { useState, useEffect } from 'react';

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

const useIntersection = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseIntersectionOptions = {},
) => {
  const { threshold = 0, rootMargin = '0px' } = options;
  const [intersection, setIntersection] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const topPositive = entry.boundingClientRect.top > 0;

          if (entry.isIntersecting && topPositive) {
            setIntersection(true);
          } else if (!entry.isIntersecting && topPositive) {
            setIntersection(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return intersection;
};

export default useIntersection;
