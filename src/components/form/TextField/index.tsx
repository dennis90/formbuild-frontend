import React from 'react';

import { Overwrite } from 'type-zoo'

export interface TextFieldProps extends Overwrite<React.InputHTMLAttributes<HTMLInputElement>, {
  id: string;
}>{
  label: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={inputProps.id}>
        {label}
      </label>

      <input {...inputProps} className="border-grey-100 border rounded-sm py-3 px-4 shadow-sm"/>
    </div>
  );
};

export default TextField;
