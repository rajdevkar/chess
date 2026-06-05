'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={clsx("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-full max-w-sm rounded-md border border-slate-300 px-4 py-2 bg-white font-medium text-slate-700 hover:bg-slate-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayLabel}
        <ChevronDownIcon className="ml-2 h-4 w-4 text-slate-500" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={clsx(
                  "block w-full text-left px-4 py-2 text-sm transition-colors",
                  option.value === value
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}