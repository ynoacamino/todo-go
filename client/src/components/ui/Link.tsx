import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  isButton?: boolean
}

const defaultProps: Partial<LinkProps> = {
  isButton: false,
};

const Link: React.FC<LinkProps> = (
  {
    children, to, className, isButton, ...props
  }: LinkProps,
) => (
  <LinkRouter
    to={to}
    className={
        twMerge(clsx(
          'text-zinc-300 hover:text-zinc-200',
          {
            'text-zinc-300 hover:text-zinc-200 bg-red-500 hover:bg-red-400 py-2 px-4 rounded-md': isButton,
          },
          className,
        ))
      }
    {...props}
  >
    {children}
  </LinkRouter>
);

Link.defaultProps = defaultProps;

export default Link;
