import { ComponentProps, Ref, forwardRef } from 'react';
import { IconButton } from './IconButton';
import { PlusIcon } from '../icons/PlusIcon';

export const AddButton = forwardRef(function CloseButton(
  props: Omit<ComponentProps<typeof IconButton>, 'icon' | 'title'>,
  ref: Ref<HTMLButtonElement> | null
) {
  return <IconButton title="Add" ref={ref} {...props} icon={<PlusIcon />} />;
});
