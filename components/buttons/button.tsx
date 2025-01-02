import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import ShowView from '../show-view';
import { forwardRef } from 'react';
import { cn } from '@/lib/classnameMerge';

const buttonVariants = cva(
  'whitespace-nowrap rounded text-sm font-medium px-5 py-2 border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/[0.5] btn focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary/[0.9] disabled:cursor-not-allowed disabled:pointer-events-none',
        secondary:
          'bg-secondary text-white hover:bg-secondary/[0.9] disabled:cursor-not-allowed disabled:pointer-events-none',
        destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
        'primary-outline':
          'bg-transparent text-app-white text-primary  border-primary hover:bg-primary/[0.03]',
        'secondary-outline':
          'bg-transparent  border-secondary text-secondary hover:bg-secondary/[0.03]',
        'secondary-white':
          'bg-white text-secondary hover:bg-white/90 hover:border-secondary ',
        transparent: 'border-none text-black',
        'gray-outline': 'border border-gray-300',
      },
      size: {
        default: '',
        sm: 'h-9 rounded-md px-3',
        lg: 'w-full max-w-[375px] ',
        icon: 'h-10 w-10 !px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      loading = false,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          {
            'opacity-50 cursor-wait': loading,
          },
          className
        )}
        ref={ref}
        onClick={onClick}
        {...props}
        disabled={loading || disabled}
      >
        <ShowView when={loading}>
          <div className="inline-flex btn py-1 justify-center items-center text-center [&>*]:w-2 [&>*]:h-2 [&>*]:bg-current [&>*]:animate-bounce [&>*]:rounded-1/2 [&>*]:text-a-16">
            <div className="!delay-700" />
            <div className="!delay-500" />
            <div className="!delay-1000" />
          </div>
        </ShowView>

        <ShowView when={!loading}>{props.children}</ShowView>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
