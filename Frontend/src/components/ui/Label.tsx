import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bold' | 'muted';
}

const Label: React.FC<LabelProps> = ({
  required = false,
  size = 'md',
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'block font-medium transition-colors duration-200';

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const variantClasses = {
    default: 'text-gray-700 dark:text-gray-300',
    bold: 'text-gray-900 dark:text-gray-100 font-semibold',
    muted: 'text-gray-500 dark:text-gray-400'
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  return (
    <label className={classes} {...props}>
      {children}
      {required && (
        <span className="text-red-500 ml-1" aria-label="requis">
          *
        </span>
      )}
    </label>
  );
};

export default Label;