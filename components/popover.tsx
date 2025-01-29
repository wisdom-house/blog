'use client';

import {
  Content,
  PopoverContentProps,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-popover';
import { usePathname } from 'next/navigation';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

interface IPopover extends Omit<PopoverContentProps, 'children'> {
  children: ReactElement | ((close: () => void) => ReactElement);
  trigger: ReactNode;
  onOpenChange?: (data: boolean) => void;
}

const Popover = ({ children, trigger, onOpenChange, ...props }: IPopover) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closePopover = () => setOpen(false);

  return (
    <Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        onOpenChange?.(open);
      }}
    >
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Content {...props} className="z-40 w-full">
          {typeof children === 'function' ? children(closePopover) : children}
        </Content>
      </Portal>
    </Root>
  );
};

export default Popover;
