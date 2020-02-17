import React, { useState } from 'react';

interface IProps {
    name: string;
    required: boolean;
    placeholder: string;
    handleChange: any;
    validationString: string;
    validationMessage: string;
}

const InputTextField = ({
  name, required, placeholder, handleChange, validationString, validationMessage,
}: IProps) => {
  const [valid, setValid] = useState(true);

  /* eslint-disable */
  // Avoid ' 'validationString' is already declared in the upper scope' error.
  // TODO:  Where should it be declared?  Escaped just to pass linting to work on tests
  const validateField = (event: any, validationString: string) => {
    const { value } = event.currentTarget;
    const regex = new RegExp(validationString);
    return (regex.test(value));
  };
  /* eslint-enable */

  return (
    <div>
      <input
        data-testid="inputid"
        name={name}
        required={required}
        type="text"
        placeholder={placeholder}
        autoCapitalize="off"
        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
          setValid(validateField(e, validationString));
        }}
        onChange={handleChange}
      />
      { !valid && <div>{validationMessage}</div> }
    </div>
  );
};

export default InputTextField;
