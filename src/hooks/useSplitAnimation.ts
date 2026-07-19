import { useEffect } from 'react';
import SplitType from 'split-type';

const useSplitAnimation = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitType(ref.current, {
      types: 'chars',
      tagName: 'span',
    });

    split.chars?.forEach((char, i) => {
      char.style.setProperty('--i', i.toString());
    });

    return () => split.revert();
  }, [ref]);
};

export default useSplitAnimation;
