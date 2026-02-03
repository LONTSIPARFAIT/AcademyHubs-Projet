import React, { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'rounded';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = 'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = variant === 'rounded' ? 'rounded-full' : '';

  const checkboxClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={checkboxClasses}
          {...props}
        />
      </div>

      {label && (
        <div className="ml-3 text-sm">
          <label
            htmlFor={checkboxId}
            className="text-gray-700 dark:text-gray-300 cursor-pointer select-none"
          >
            {label}
          </label>

          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}

          {helperText && !error && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;