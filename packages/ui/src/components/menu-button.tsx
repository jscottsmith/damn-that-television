import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline"

import {
  Button,
  type ButtonProps,
} from "@workspace/ui/components/button"

type MenuButtonProps = Omit<ButtonProps, "presentation"> & {
  open: boolean
}

function MenuButton({ open, ...props }: MenuButtonProps) {
  return (
    <Button data-slot="menu-button" presentation="icon" {...props}>
      {open ? <XMarkIcon /> : <Bars4Icon />}
    </Button>
  )
}

export { MenuButton }
export type { MenuButtonProps }
