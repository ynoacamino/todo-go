import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const defaultProps: Partial<ButtonProps> = {
  className: undefined,
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    className={twMerge(clsx(
      'text-zinc-300 hover:text-zinc-200 bg-red-500 hover:bg-red-400 py-2 px-4 rounded-md',
      className,
    ))}
    {...props}
  >
    {children}
  </button>
);

Button.defaultProps = defaultProps;

export default Button;
