import React from 'react';

const Input = ({
  type,
  autocomplete,
  id,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  errorText,
}) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        autoComplete={autocomplete ?? 'off'}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 w-full ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && (
        <div className='text-red-500 text-xs mt-1'>
          <div>{errorText ?? ''}</div>
        </div>
      )}
    </div>
  );
};

export default Input;
