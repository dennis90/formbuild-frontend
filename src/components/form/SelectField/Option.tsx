import React from 'react';

export type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

const Option: React.FC<OptionProps> = (props) => {
  return (
    <option {...props}/>
  );
};

export default Option;
