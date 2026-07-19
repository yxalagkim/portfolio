import { useRef } from 'react';
import clsx from 'clsx';
import useIntersection from '@/hooks/useIntersection';
import useSplitAnimation from '@/hooks/useSplitAnimation';

const AppearChars = ({ children }: { children: React.ReactNode }) => {
  const charRef = useRef<HTMLSpanElement>(null);
  const intersection = useIntersection(charRef);
  useSplitAnimation(charRef);

  return (
    <span
      ref={charRef}
      className={clsx('appear-chars', intersection && 'is-visible')}
    >
      {children}
    </span>
  );
};

export default AppearChars;
