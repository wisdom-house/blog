import { FC, TextareaHTMLAttributes } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import ShowView from '../show-view';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  validation?: RegisterOptions;
  footerText?: string;
}

const Textarea: FC<TextAreaProps> = ({
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
      <textarea {...register(name, validation)} id={name} {...props} />

      <ShowView when={!!error || !!footerText}>
        <small className={error ? 'text-error' : ''}>
          {(error as string) || footerText}
        </small>
      </ShowView>
    </div>
  );
};

export default Textarea;
