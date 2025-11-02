"use client";
import React from "react";
import clsx from "clsx";

interface RadioSelectProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

const RadioSelect: React.FC<RadioSelectProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label
      className={clsx(
        "flex items-center gap-4 border rounded-lg p-4 cursor-pointer transition-all duration-300",
        checked ? "border-primary" : "border-accent hover:border-primary"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="w-4 h-4 border border-accent checked:accent-primary rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 indeterminate:bg-primary"
      />
      <span className="text-[14px] font-bold tracking-[-0.21px] text-true-black">
        {label}
      </span>
    </label>
  );
};

export default RadioSelect;
