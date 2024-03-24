import React, { InputHTMLAttributes, ChangeEvent } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  labelFor: string;
  placeholderText: string;
  ariaLabelName: string;
  type: string;
  id: string,
  name: string
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  inputLabel,
  labelFor,
  placeholderText,
  ariaLabelName,
  value,
  onChange,
  ...inputProps
}) => {
  return (
    <div className="font-general-regular mb-4">
      <label
        className="block text-lg text-primary-dark dark:text-primary-light mb-1"
        htmlFor={labelFor}
      >
        {inputLabel}
      </label>
      <input
        className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
        placeholder={placeholderText}
        aria-label={ariaLabelName}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
};

export default FormInput;
