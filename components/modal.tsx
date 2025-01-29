'use client';

import {
  Close,
  Content,
  DialogOverlay,
  Portal,
  Root,
  Trigger,
  Title,
} from '@radix-ui/react-dialog';
import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import SvgIcon from './icon';
import ShowView from './show-view';
import { cn } from '@/lib/classnameMerge';

interface IModalProps {
  trigger: ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  hideCloseButton?: boolean;
  onClose?: () => void;
  disableEscapeDown?: boolean;
  disableOutsideClick?: boolean;
  alignTop?: boolean;
  customClassName?: string;
  title?: string;
}

export type ModalRefActions = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<unknown, IModalProps>(
  (
    {
      trigger,
      children,
      hideCloseButton,
      onClose,
      disableEscapeDown,
      disableOutsideClick,
      alignTop = false,
      customClassName,
      title,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
      onClose?.();

      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: closeModal,
    }));

    const resolvedChildren =
      typeof children === 'function' ? children(closeModal) : children;

    return (
      <Root open={isOpen} onOpenChange={setIsOpen}>
        <Trigger asChild>{trigger}</Trigger>
        <Portal>
          <DialogOverlay
            className={cn(
              `bg-black/40 data-[state=open]:animate-overlayShow backdrop-blur-sm fixed p-10 inset-0 ${!alignTop && 'grid place-items-center'} z-30`,
              customClassName
            )}
          >
            <Title className="hidden">{title ?? 'modal'}</Title>

            <Content
              ref={ref as ForwardedRef<HTMLDivElement>}
              onPointerDownOutside={(e) =>
                disableOutsideClick && e.preventDefault()
              }
              onEscapeKeyDown={(e) => disableEscapeDown && e.preventDefault()}
              className="data-[state=open]:animate-contentShow max-h-[90vh] lg:max-h-[85vh] w-full overflow-hidden max-w-[1200px] mx-auto focus:outline-none"
            >
              <ShowView when={!hideCloseButton}>
                <Close className="bg-brand-gray-50 block ml-auto h-max w-max rounded-[50%]">
                  <SvgIcon
                    name="close"
                    onClick={closeModal}
                    className="w-10 h-10"
                  />
                </Close>
              </ShowView>

              {resolvedChildren}
            </Content>
          </DialogOverlay>
        </Portal>
      </Root>
    );
  }
);

Modal.displayName = 'Modal';
export default Modal;
