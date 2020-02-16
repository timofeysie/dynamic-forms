import React, { useState } from 'react';
import './style.css';
import InputTextField from './inputs/InputTextField';
import DatepickerField from './inputs/DatepickerField';

const DynamicForm = (props: any) => {
  /* eslint-disable */
  // TODO: avoid the linting error:
  // "Must use destructuring props assignment react/destructuring-assignment"
  // fixing this causes the tests to break.
  const [ fields ] = useState(props.fields);
  //const [ input, setInput] = useState({});
  const [ input, setInput] = useState({});
  /* eslint-enable */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSubmit(input);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((form: any) => {
        if (form.input_type === 'text') {
          return (
            <InputTextField
              validationString={form.validationString}
              validationMessage={form.validationMessage}
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
        if (form.input_type === 'datepicker') {
          return (
            <DatepickerField
              name={form.name}
              required={form.required}
              key={form.placeholder+form.name}
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
