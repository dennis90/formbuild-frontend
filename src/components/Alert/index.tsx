import React from 'react';

export interface AlertProps {
  status: "error";
}

const Alert: React.FC<AlertProps> = (props) => {
  const classNames = ['text-red-500', 'bg-red-900', 'font-semibold', 'rounded-md', 'p-3', 'px-5'];

  return (
    <div className={classNames.join(' ')}>
      {props.children}
    </div>
  );
};

export default Alert;
