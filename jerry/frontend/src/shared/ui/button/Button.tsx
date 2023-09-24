import React, { forwardRef, ReactNode } from "react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export type ComponentPosition = "top" | "bottom" | "left" | "right"
export type ComponentShape = "circle" | "square"
export type ComponentSize = "lg" | "md" | "sm" | "xs"
export type ComponentStatus = "info" | "success" | "warning" | "error"
export type ComponentBrandColors = "primary" | "secondary" | "accent"
export type ComponentColor = ComponentBrandColors | "ghost" | ComponentStatus
export type ComponentBgColors = "base-100" | "base-200" | "base-300" | "neutral"
export type ComponentTabVariant = "bordered" | "lifted" | "boxed" | "separated"

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> & {
  href?: string
  shape?: ComponentShape
  size?: ComponentSize
  variant?: "outline" | "link"
  color?: ComponentColor
  fullWidth?: boolean
  responsive?: boolean
  animation?: boolean
  loading?: boolean
  active?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      href,
      shape,
      size = "md",
      variant,
      color,
      startIcon,
      endIcon,
      fullWidth,
      responsive,
      animation = true,
      loading,
      active,
      disabled,
      className,
      style,
      ...props
    },
    ref,
  ): JSX.Element => {
    const classes = twMerge(
      "btn normal-case",
      className,
      clsx(((startIcon && !loading) || endIcon) && "gap-2", {
        [`btn-${size}`]: size,
        [`btn-${shape}`]: shape,
        [`btn-${variant}`]: variant,
        [`btn-${color}`]: color,
        "btn-block": fullWidth,
        "btn-xs md:btn-sm lg:btn-md xl:btn-lg": responsive,
        "no-animation": !animation,
        "btn-active": active,
        "btn-disabled": disabled,
        loading: loading,
      }),
    )

    if (href) {
      return (
        <a className={classes} style={style} href={href}>
          {startIcon && startIcon}
          {children}
          {endIcon && endIcon}
        </a>
      )
    } else {
      return (
        <button
          {...props}
          ref={ref}
          className={classes}
          style={style}
          disabled={disabled}
        >
          {startIcon && !loading && startIcon}
          {children}
          {endIcon && endIcon}
        </button>
      )
    }
  },
)

export default Button
