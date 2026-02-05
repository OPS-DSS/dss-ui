import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'

// Types for the button component
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  /** Visual variant of the button */
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Size of the button */
  size?: 'sm' | 'default' | 'lg'
  /** Whether the button is in a loading state */
  loading?: boolean
  /** Content to show when loading */
  loadingText?: string
  /** Additional CSS classes */
  className?: string
  /** Children elements */
  children?: React.ReactNode
}

/**
 * Button component built on Base UI primitives.
 *
 * This is a headless component - all styling is controlled by the consumer
 * via className prop or by wrapping with styled components.
 *
 * Features:
 * - Full keyboard accessibility
 * - Disabled state handling
 * - Loading state support
 * - Composable with any styling solution
 *
 * @example
 * // Basic usage
 * <Button onClick={() => console.log('clicked')}>Click me</Button>
 *
 * @example
 * // With Tailwind
 * <Button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</Button>
 *
 * @example
 * // Loading state
 * <Button loading loadingText="Submitting...">Submit</Button>
 *
 * @example
 * // As a different element
 * <Button render={<a href="/link" />}>Go to page</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      loadingText,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Combine disabled states
    const isDisabled = disabled || loading

    return (
      <BaseButton
        ref={ref}
        disabled={isDisabled}
        // Use className as a function to access component state for data attributes
        className={(state) => {
          const baseClass = className || ''
          // The state object includes: disabled, focusVisible, pressed
          return baseClass
        }}
        // Data attributes for styling hooks
        data-variant={variant}
        data-size={size}
        data-loading={loading || undefined}
        {...props}
      >
        {loading && loadingText ? loadingText : children}
      </BaseButton>
    )
  },
)

Button.displayName = 'Button'

// Export types for consumers
export type { ButtonProps as ButtonComponentProps }
