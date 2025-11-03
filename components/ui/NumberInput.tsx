"use client";
import React from "react";
import clsx from "clsx";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
}) => {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between w-30 bg-surface p-2 md:px-3 md:py-3">
      <button
        type="button"
        onClick={handleDecrease}
        className={clsx(
          "text-gray text-lg font-bold transition-all duration-300 hover:text-primary cursor-pointer"
        )}
      >
        -
      </button>
      <span className="text-[13px] font-bold tracking-[0.063rem] text-black">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        className={clsx(
          "text-gray text-lg font-bold transition-all duration-300 hover:text-primary cursor-pointer"
        )}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
