/**
 * Reusable UI Components
 */
import React from 'react';
import clsx from 'clsx';

/**
 * Button Component
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded transition focus:outline-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        (loading || disabled) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? '⏳ Loading...' : children}
    </button>
  );
};

/**
 * Input Component
 */
export const Input = ({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

/**
 * Select Component
 */
export const Select = ({
  label,
  error,
  options,
  value,
  onChange,
  required = false,
  placeholder = 'Select an option...',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

/**
 * Alert Component
 */
export const Alert = ({ type = 'info', message, onClose }) => {
  const colors = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div className={clsx('border-l-4 p-4 mb-4 rounded', colors[type])}>
      <div className="flex justify-between items-center">
        <p>{message}</p>
        {onClose && (
          <button onClick={onClose} className="font-bold text-lg">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Loading Spinner
 */
export const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={clsx(
          'border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin',
          sizes[size]
        )}
      />
      <p className="text-gray-600 mt-4">{message}</p>
    </div>
  );
};

/**
 * Data Table Component
 */
export const Table = ({ columns, data, loading = false, onRowClick }) => {
  if (loading) return <LoadingSpinner />;

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-8">No data available</p>;
  }

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="border-b hover:bg-gray-50 cursor-pointer transition"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-800">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Modal Component
 */
export const Modal = ({ isOpen, title, children, onClose, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};
