import { routes } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useId } from 'react';
import {
  ClearIndicatorProps,
  components,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  MenuProps,
  OptionProps,
} from 'react-select';
import ASelect, { AsyncProps } from 'react-select/async';
import SvgIcon from '../icon';
import { SelectOptionType } from './select';

export interface AsyncSelectOptionType extends SelectOptionType {
  image?: string;
  price?: number;
  slug?: string;
  title?: string;
  excerpt?: number;
}

type AsyncSelectProps = AsyncProps<
  AsyncSelectOptionType,
  true,
  GroupBase<AsyncSelectOptionType>
>;

export const DropdownIndicator = (
  props: DropdownIndicatorProps<
    AsyncSelectOptionType,
    true,
    GroupBase<AsyncSelectOptionType>
  >
) => {
  return (
    <components.DropdownIndicator {...props} className="ml-2">
      <SvgIcon name="search" className="h-4 w-4 text-brand-gray-light" />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props} className="text-inherit">
      <SvgIcon name="close" className="h-3 w-4" />
    </components.ClearIndicator>
  );
};

export const Control = (
  props: ControlProps<
    AsyncSelectOptionType,
    true,
    GroupBase<AsyncSelectOptionType>
  >
) => (
  <components.Control
    {...props}
    className={`border bg-app-background text-app-text w-full rounded p-2 px-3 focus:border-red-700 h-max rounded-5 ${props.isDisabled && '!cursor-not-allowed pointer-events-none'} ${props.isFocused && '!shadow-none'}`}
  />
);

export const Option = (props: OptionProps<AsyncSelectOptionType>) => (
  <components.Option
    {...props}
    className="relative z-1 text- p-3 !bg-app-background rounded-10 border-b last-of-type:border-b-0 ease-linear transition-colors duration-75 w-full"
  >
    <Link
      href={routes.post(props.data.slug ?? '/')}
      className="flex w-full items-center gap-3"
    >
      <div className="relative w-12 h-12 flex-1 aspect-square lg:w-16 lg:h-16 border group-hover:scale-110 duration-200 ease-linear transition-all grid place-items-center">
        {props.data.image ? (
          <Image
            src={props.data.image ?? ''}
            alt={props.data.title ?? ''}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Blog Details */}
      <div className="flex flex-col">
        <span className="font-medium text-sm lg:text-base">
          {props.data.label}
        </span>
        <p className="text-xs line-clamp-2">{props.data.excerpt}</p>
      </div>
    </Link>
  </components.Option>
);

export const Menu = (
  props: MenuProps<
    AsyncSelectOptionType,
    true,
    GroupBase<AsyncSelectOptionType>
  >
) => (
  <components.Menu
    {...props}
    className="z-50 overflow-auto border !bg-app-background !shadow-app-shadow rounded-lg mt-2"
  >
    {props.children}
  </components.Menu>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AsyncSelect = forwardRef<any, AsyncSelectProps>(({ ...props }, ref) => {
  return (
    <div className="w-full input mb-0 p-1">
      <ASelect
        ref={ref}
        {...props}
        components={{
          Option,
          Control,
          Menu,
          DropdownIndicator,
        }}
        unstyled
        instanceId={useId()}
        menuPlacement="auto"
        isClearable
        cacheOptions
      />
    </div>
  );
});

AsyncSelect.displayName = 'AsyncSelect';
export default AsyncSelect;
