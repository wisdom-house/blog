import { ReactNode } from 'react';

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  TooltipContentProps,
  Trigger,
} from '@radix-ui/react-tooltip';

interface TooltipProps extends Omit<TooltipContentProps, 'children'> {
  text: string;
  trigger: ReactNode;
}

const Tooltip = ({ text, trigger, ...props }: TooltipProps) => {
  return (
    <Provider delayDuration={0} skipDelayDuration={0}>
      <Root>
        <Trigger asChild>{trigger}</Trigger>
        <Portal>
          <Content
            {...props}
            className="z-40 w-full p-2 max-w-[250px] text-center rounded bg-app-foreground border"
          >
            {text}
            <Arrow className="text-primary fill-current" />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
};

export default Tooltip;
