import { forwardRef, ReactElement, useId } from 'react';
import CustomSelect, {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  MenuProps,
  MultiValueProps,
  MultiValueRemoveProps,
  NoticeProps,
  OptionProps,
  Props,
  components,
} from 'react-select';

import ShowView from '../show-view';
import SvgIcon from '../icon';

export interface SelectOptionType {
  value: string;
  label: string;
}

export type ExtraSelectProp = {
  footer?: ReactElement | string;
  label?: string;
  isError?: boolean;
  required?: boolean;
};

type SelecTProps = Props & ExtraSelectProp;

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props} className="ml-2">
      <SvgIcon name="chevron-down" className="h-4 w-4 text-brand-gray-light" />
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
export const Control = (props: ControlProps) => (
  <components.Control
    {...props}
    className={`"border-1 w-full px-3 md:min-w-[180px] h-max rounded-4 ${props.isDisabled && '!cursor-not-allowed pointer-events-none'}`}
  />
);

export const Option = (props: OptionProps) => (
  <components.Option {...props}>
    <div className={`p-1 bg-white`}>
      <p
        className={`${props.isFocused && ''} ${props.isDisabled && 'opacity-50 cursor-not-allowed'} hover:bg-brand-gray-light/10  py-2 px-4 border-b cursor-pointer`}
      >
        {props.children}
      </p>
    </div>
  </components.Option>
);

export const MultiValueRemove = (props: MultiValueRemoveProps) => (
  <components.MultiValueRemove {...props}>
    <SvgIcon name="close" className="h-3 w-4" />
  </components.MultiValueRemove>
);

export const MultiValue = (props: MultiValueProps) => (
  <components.MultiValue
    {...props}
    className={`bg-brand-gray-light py-[1px] px-1 gap-1 m-1 rounded-[100px]`}
  />
);

export const Menu = (props: MenuProps) => (
  <components.Menu
    {...props}
    className="z-10 overflow-auto border shadow-xl bg-white p-3 rounded-lg mt-2"
  >
    {props.children}
  </components.Menu>
);

export const NoOptionsMessage = (props: NoticeProps) => (
  <components.NoOptionsMessage {...props}>
    <div className=" text-sm mt-2 px-2 py-5 bg-white border-1">
      No options available
    </div>
  </components.NoOptionsMessage>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Select = forwardRef<any, SelecTProps>(
  ({ footer, isError, label, required = true, ...props }, ref) => {
    return (
      <div className="auth-input">
        <label htmlFor="state">
          {label}
          <ShowView when={required}>
            <span className="text-error">*</span>
          </ShowView>
        </label>

        <div className="!py-1">
          <CustomSelect
            ref={ref}
            {...props}
            unstyled
            components={{
              Control,
              DropdownIndicator,
              Option,
              MultiValueRemove,
              MultiValue,
              NoOptionsMessage,
              ClearIndicator,
              Menu,
            }}
            instanceId={useId()}
            menuPlacement="auto"
            isClearable
          />
        </div>

        {typeof footer === 'string' ? (
          <small className={`${isError ? 'text-red-600' : ''}`}>{footer}</small>
        ) : (
          footer
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
