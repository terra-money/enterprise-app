import { ComponentProps, Ref, forwardRef } from 'react';
import { IconButton } from './IconButton';
import { TrashIcon } from '../icons/TrashIcon';

export const DeleteButton = forwardRef(function CloseButton(
  props: Omit<ComponentProps<typeof IconButton>, 'icon' | 'title' | 'kind'>,
  ref: Ref<HTMLButtonElement> | null
) {
  return <IconButton kind="alert" title="Delete" ref={ref} {...props} icon={<TrashIcon />} />;
});
