import { IconButton, IconButtonProps } from './icon-button';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/outline';

type MenuButtonProps = IconButtonProps & {
  open: boolean;
};

export function MenuButton(props: MenuButtonProps) {
  return (
    <IconButton {...props}>
      {props.open ? <XMarkIcon /> : <Bars4Icon />}
    </IconButton>
  );
}
