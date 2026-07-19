'use client';

import clsx from 'clsx';
import { handleBallEnter } from '@/utils/buttonBall';
import { Arrow } from '@/components/icons';

interface ButtonProps {
  href: string;
  className?: string;
  target?: boolean;
  ariaLabel?: string;
  text: string;
}

const LinkButton = ({
  href,
  className,
  target = false,
  ariaLabel,
  text,
}: ButtonProps) => {
  return (
    <a
      href={href}
      className={clsx('btn', className)}
      target={target ? '_blank' : undefined}
      rel={target ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      onMouseEnter={handleBallEnter}
    >
      <span className="btn__text">{text}</span>
      <Arrow className="btn__arrow" />
      <span className="btn__ball"></span>
    </a>
  );
};

export default LinkButton;
