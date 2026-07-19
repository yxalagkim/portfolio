'use client';

import { useState, useEffect } from 'react';
import { Asterisk } from '@/components/icons';
import MindsetCanvas from '@/components/canvas/MindsetCanvas';
import Marquee from '@/components/animation/Marquee';

const Mindset = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isSafari) return;

    const handleFocus = () => {
      setKey((prev) => prev + 1);
    };

    window.addEventListener('focus', handleFocus);

    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <section className="mindset">
      <MindsetCanvas key={key} />
      <Marquee className="mindset__marquee" length={6}>
        A publisher who brings ideas to life
        <Asterisk />
      </Marquee>
    </section>
  );
};

export default Mindset;
