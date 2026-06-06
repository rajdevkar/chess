import clsx from 'clsx';
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({
  className,
  variant = 'primary',
  isLoading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        "w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none gap-0.5",
        disabled || isLoading ? "cursor-not-allowed" : "cursor-pointer",
        variant === 'primary' && "bg-brand text-white hover:bg-brand-hover",
        variant === 'secondary' && "border border-brand text-brand",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>
      )}

      <span>{isLoading ? 'Loading...' : children}</span>

      {!isLoading && rightIcon && (
        <span className="flex items-center shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
