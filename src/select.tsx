'use client'

import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { Field } from '@base-ui/react/field'
import { Icon } from '@iconify/react'

// Types
export interface SelectOption<T = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface SelectProps<T = string> {
  /** Array of options to display */
  options: SelectOption<T>[]
  /** Currently selected value (controlled) */
  value?: T
  /** Default value (uncontrolled) */
  defaultValue?: T
  /** Callback when value changes */
  onValueChange?: (value: T) => void
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Label for the select field */
  label?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether the select is required */
  required?: boolean
  /** Name attribute for form submission */
  name?: string
  /** ID for the select element */
  id?: string

  // Class name props for full styling control
  /** Class for the root field wrapper */
  className?: string
  /** Class for the label element */
  labelClassName?: string
  /** Class for the trigger button */
  triggerClassName?: string
  /** Class for the value display */
  valueClassName?: string
  /** Class for the dropdown icon */
  iconClassName?: string
  /** Class for the positioner */
  positionerClassName?: string
  /** Class for the popup container */
  popupClassName?: string
  /** Class for the list container */
  listClassName?: string
  /** Class for each item */
  itemClassName?: string
  /** Class for the item text */
  itemTextClassName?: string
  /** Class for the item indicator (checkmark) */
  itemIndicatorClassName?: string
}

/**
 * Select component built on Base UI primitives.
 *
 * This is a headless component - all styling is controlled via className props.
 * Each part of the select has its own className prop for granular control.
 *
 * Features:
 * - Full keyboard navigation
 * - ARIA compliant
 * - Customizable icons via render props
 * - Support for disabled options
 * - Works with forms
 *
 * @example
 * // Basic usage
 * const options = [
 *   { value: 'apple', label: 'Apple' },
 *   { value: 'banana', label: 'Banana' },
 * ];
 * <Select options={options} placeholder="Select a fruit" />
 *
 * @example
 * // With Tailwind classes
 * <Select
 *   options={options}
 *   triggerClassName="border rounded px-3 py-2"
 *   popupClassName="bg-white shadow-lg rounded"
 *   itemClassName="px-3 py-2 hover:bg-gray-100"
 * />
 */
export function Select<T extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  required = false,
  name,
  id,
  className,
  labelClassName,
  triggerClassName,
  valueClassName,
  iconClassName,
  positionerClassName,
  popupClassName,
  listClassName,
  itemClassName,
  itemTextClassName,
  itemIndicatorClassName,
}: SelectProps<T>): React.JSX.Element {
  // Convert options to the format Base UI expects for value lookup
  const items = options.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }))

  return (
    <Field.Root className={className} name={name} disabled={disabled}>
      {label && (
        <Field.Label
          className={labelClassName}
          nativeLabel={false}
          render={<div />}
        >
          {label}
        </Field.Label>
      )}

      <BaseSelect.Root
        items={items}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(newValue) => {
          onValueChange?.(newValue as T)
        }}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
      >
        <BaseSelect.Trigger className={triggerClassName}>
          <BaseSelect.Value
            className={valueClassName}
            placeholder={placeholder}
          />
          <BaseSelect.Icon className={iconClassName}>
            <Icon icon="mdi:chevron-down" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner className={positionerClassName} sideOffset={4}>
            <BaseSelect.Popup className={popupClassName}>
              <BaseSelect.ScrollUpArrow />
              <BaseSelect.List className={listClassName}>
                {options.map((option) => (
                  <BaseSelect.Item
                    key={String(option.value)}
                    value={option.value}
                    disabled={option.disabled}
                    className={itemClassName}
                  >
                    <BaseSelect.ItemIndicator
                      className={itemIndicatorClassName}
                    >
                      <Icon icon="mdi:check" />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText className={itemTextClassName}>
                      {option.label}
                    </BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
              <BaseSelect.ScrollDownArrow />
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </Field.Root>
  )
}

// Export a version without Field wrapper for more advanced use cases
export { BaseSelect as SelectPrimitive }
