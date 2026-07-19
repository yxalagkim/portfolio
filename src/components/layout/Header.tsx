'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStore } from '@/store';
import useScrollTo from '@/hooks/useScrollTo';
import { Logo } from '@/components/icons';
import Menu from '@/components/layout/Menu';
import MenuButton from '@/components/layout/MenuButton';

const Header = () => {
  const lenis = useStore((state) => state.lenis);
  const [isLight, setIsLight] = useState(false);
  const { scrollTo } = useScrollTo();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      '[data-header-theme="light"]',
    );

    if (!lenis || sections.length === 0) return;

    const handleScroll = ({ scroll }: { scroll: number }) => {
      let isLight = false;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scroll >= top && scroll <= bottom) {
          isLight = true;
        }
      });

      setIsLight(isLight);
    };

    handleScroll({ scroll: lenis.scroll });
    lenis.on('scroll', handleScroll);

    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  return (
    <>
      <header className={clsx('header', isLight && 'header--light')}>
        <div className="inner header__inner">
          <h1 className="header__logo">
            <Link href="/" onClick={() => scrollTo(0)}>
              <Logo />
            </Link>
          </h1>
          <MenuButton />
        </div>
      </header>
      <Menu />
    </>
  );
};

export default Header;
