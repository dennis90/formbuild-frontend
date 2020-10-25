import React from 'react';
import { Overwrite } from 'type-zoo'

export { default as Option } from './Option';

export interface SelectFieldProps extends Overwrite<React.SelectHTMLAttributes<HTMLSelectElement>, {
  id: string;
}>{
  label: React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { label, ...inputProps } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={inputProps.id}>
        {label}
      </label>

      <select {...inputProps} className="border-grey-100 border rounded-sm p-3 bg-white shadow-sm"/>
    </div>
  );
};

export default SelectField;
