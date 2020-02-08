import React, { useState } from 'react';
import './style.css';
import InputTextField from './inputs/InputTextField';

const DynamicForm = (props: any) => {
  /* eslint-disable */
  // TODO: avoid the linting error:
  // "Must use destructuring props assignment react/destructuring-assignment"
  // fixing this causes the tests to break.
  const [fields] = useState(props.fields);
  /* eslint-enable */
  const [inputState, setInputState] = useState(props);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSubmit(inputState);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setInputState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((form: any) => {
        if (form.input_type === 'text') {
          return (
            <InputTextField
              name={form.name}
              placeholder={form.placeholder}
              required={form.required}
              key={form.placeholder}
              handleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          );
        }
        return <p>No form data.</p>;
      })}
      <input
        className="Submit"
        type="submit"
      />
    </form>
  );
};
export default DynamicForm;
