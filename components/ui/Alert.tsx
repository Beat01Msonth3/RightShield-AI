import React from 'react';

export interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'danger';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const styles = {
    info: 'bg-teal-50 border-teal-200 text-teal-900 dark:bg-teal-950/30 dark:border-teal-900 dark:text-teal-200',
    warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200',
    error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-900 dark:text-red-200',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-200',
    danger: 'bg-red-100 border-red-300 text-red-950 dark:bg-red-900/40 dark:border-red-800 dark:text-red-100 animate-pulse',
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type]} ${className}`} role="alert">
      {title && <h4 className="font-bold mb-1">{title}</h4>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};
