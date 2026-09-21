import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'danger';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl p-5 transition-all bg-white dark:bg-slate-900';

  const variants = {
    default: 'border border-slate-100 dark:border-slate-800 shadow-sm',
    bordered: 'border-2 border-slate-200 dark:border-slate-700',
    elevated: 'shadow-md border border-slate-100 dark:border-slate-800',
    danger: 'border-2 border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-950/20',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
