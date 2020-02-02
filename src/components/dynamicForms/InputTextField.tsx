import React from 'react';

interface IProps {
    name: string;
    required: boolean;
    placeholder: string;
    handleChange: any;
}

const InputTextField = ({
  name, required, placeholder, handleChange,
}: IProps) => (
  <div>
    <input
      name={name}
      required={required}
      type="text"
      placeholder={placeholder}
      autoCapitalize="off"
      onChange={handleChange}
    />
  </div>
);

export default InputTextField;
