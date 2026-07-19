import { useStore } from '@/store';

const useScrollTo = () => {
  const lenis = useStore((state) => state.lenis);

  const scrollTo = (target: string | number) => {
    if (!lenis) return;

    lenis.scrollTo(target, {
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  };

  return { scrollTo };
};

export default useScrollTo;
