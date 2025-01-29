import { FC, InputHTMLAttributes } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import ShowView from '../show-view';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  validation?: RegisterOptions;
  footerText?: string;
}

const Input: FC<InputProps> = ({
  name,
  label,
  validation,
  footerText,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="app-input">
      <label htmlFor={name}>{label}</label>
      <input {...register(name, validation)} id={name} {...props} />

      <ShowView when={!!error || !!footerText}>
        <small className={error ? 'text-error' : ''}>
          {(error as string) || footerText}
        </small>
      </ShowView>
    </div>
  );
};

export default Input;
