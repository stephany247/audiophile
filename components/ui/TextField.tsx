"use client";
import React from "react";
import clsx from "clsx";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  value,
  placeholder,
  className,
  ...props
}) => {
  const isActive = !!value && !error;
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm text-[12px] font-bold tracking-[-0.21px] text-true-black">
      <div className="flex justify-between items-center">
        <label htmlFor={label} className={`${hasError && "text"}`}>
          {label}
        </label>
        {hasError && (
          <span className="text-red text-[12px] font-medium">
            {error}
          </span>
        )}
      </div>

      <input
        id={label}
        value={value}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-transparent py-2 px-3 rounded-lg caret-primary outline-none transition-all duration-300 focus:border-[#D87D4A]",
          hasError && "border-2 border-red",
          isActive && "border border-[#D87D4A] text-[#101010]",
          !hasError && !isActive && "border border-border",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default TextField;
