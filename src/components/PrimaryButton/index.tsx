import React from 'react';

export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ type='button', loading = false, ...buttonProps }) => {
  const classNames = [
    'bg-blue-500', 'hover:bg-blue-600', 'text-white', 'py-3', 'px-10', 'rounded-sm shadow', 'font-semibold'
  ];

  if (buttonProps.disabled || loading) {
    classNames.push('pointer-events-none')

    if (loading) {
      classNames.push('cursor-wait')
    } else {
      classNames.push('cursor-not-allowed', 'bg-gray-500', 'text-gray-100')
    }
  }

  return (
    <button
      {...buttonProps}
      type={type}
      className={`${classNames.join(' ')}`}
    />
  );
};

export default PrimaryButton;
