import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = ({ 
  children, 
  variant = "primary", 
  isLoading, 
  icon, 
  className = "", 
  ...props 
}: ButtonProps) => {
  
  //Current styles in the project
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Blue Button (Save, Add, etc.)
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm shadow-blue-200 dark:shadow-none",
    // Grey Button (Cancel, Inactive, etc.)
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    // Red Button (Delete, Logout, etc.)
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-200 dark:shadow-none",
    // Outline Button (Theme selection, etc.)
    outline: "border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : icon ? (
        <span className="w-5 h-5">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};