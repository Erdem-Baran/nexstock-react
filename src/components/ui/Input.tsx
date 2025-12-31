import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-lg outline-none transition-all
            bg-white dark:bg-gray-900 dark:text-white
            focus:ring-2 focus:ring-blue-500
            disabled:bg-gray-100 disabled:dark:bg-gray-800
            ${error 
              ? "border-red-500 focus:ring-red-200" 
              : "border-gray-300 dark:border-gray-700"
            } 
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";