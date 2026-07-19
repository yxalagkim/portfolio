'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/store';
import Marquee from '@/components/animation/Marquee';

const Hero = () => {
  const lenis = useStore((state) => state.lenis);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      setIsHidden(scroll > 50);
    };

    lenis.on('scroll', handleScroll);

    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  return (
    <section className="hero" id="home">
      <div className="inner hero__inner">
        <div className="hero__content">
          <h2 className="hero__title">
            <span>
              <span>Code</span>
              <span>With</span>
            </span>
            <span>Clarity</span>
            <span>Precision</span>
          </h2>
          <div className="hero__desc">
            <p>
              <span>With every</span>
              <span>line of code,</span>
            </p>
            <p>I aim for clarity, performance,</p>
            <p>
              <span>and a</span>
              <span>seamless experience.</span>
            </p>
          </div>
        </div>
        <Marquee
          className="hero__marquee"
          length={5}
          direction="right"
          stroke
          hidden={isHidden}
        >
          Scroll Down
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
