import React, { forwardRef } from "react"
import { Icon as IconifyIcon } from "@iconify/react"
import { twMerge } from "tailwind-merge"
import { IconifyIconProps } from "@iconify/react"

type IconProps = React.HTMLAttributes<SVGElement> &
  Omit<IconifyIconProps, "icon"> & {
    name: string
  }

export const Icon = forwardRef<SVGElement, IconProps>(
  ({ name, className, ...props }, ref): JSX.Element => {
    return (
      <IconifyIcon
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        className={twMerge(className)}
        icon={name}
        {...props}
      />
    )
  },
)

export default Icon

Icon.displayName = "Icon"
