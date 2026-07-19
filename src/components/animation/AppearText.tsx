'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';
import useIntersection from '@/hooks/useIntersection';

interface AppearTextProps {
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const AppearText = ({ className, children, ref }: AppearTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(containerRef);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;

        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      className={clsx('appear-text', className, intersection && 'is-visible')}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;

        const el = child as React.ReactElement<{
          style?: React.CSSProperties;
        }>;

        const style = {
          ...(el.props.style || {}),
          '--i': i,
        } as React.CSSProperties;

        return <div style={style}>{el}</div>;
      })}
    </div>
  );
};

export default AppearText;
