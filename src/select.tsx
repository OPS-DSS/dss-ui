"use client";

import { type JSX } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  id?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  label,
  id,
}: SelectProps): JSX.Element {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <div className={`select-wrapper ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            fontSize: "0.875rem",
          }}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          fontSize: "1rem",
          lineHeight: "1.5",
          color: "#1f2937",
          backgroundColor: "#fff",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          cursor: "pointer",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
