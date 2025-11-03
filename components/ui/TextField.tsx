"use client";
import React from "react";
import clsx from "clsx";

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  id,
  value,
  placeholder,
  className,
  ...props
}) => {
  const isActive = !!value && !error;
  const hasError = !!error;
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm text-[12px] font-bold tracking-[-0.21px] text-true-black">
      <div className="flex justify-between items-center">
        <label htmlFor={inputId} className={hasError ? "text-red" : ""}>
          {label}
        </label>
        {hasError && (
          <span className="text-red text-[12px] font-medium">{error}</span>
        )}
      </div>

      <input
        id={inputId}
        value={value}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-transparent p-4 rounded-lg caret-primary outline-none transition-all duration-300 focus:border-primary",
          hasError && "border-2 border-red",
          isActive && "border border-primary text-black",
          !hasError && !isActive && "border border-accent",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default TextField;
