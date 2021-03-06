/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import './style.css';
import InputTextField from './inputs/InputTextField';
import DatepickerField from './inputs/DatepickerField';
import SelectField from './inputs/SelectField';

const DynamicForm = (props: any) => {
  /* eslint-disable */
  // TODO: avoid the linting error:
  // "Must use destructuring props assignment react/destructuring-assignment"
  // fixing this causes the tests to break.
  const [ fields ] = useState(props.fields);
  const [ input, setInput] = useState({});

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
              handleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              datePlaceholder={form.datePlaceholder}
              validationPeriod={18}
              validationMessage={form.validationMessage}
              key={form.placeholder + form.name}
            />
          );
        }
        if (form.input_type === 'select') {
          return (
            <SelectField
              name={form.name}
              required={form.required}
              label={form.label}
              handleChange={(e: React.FormEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
              selectValues={form.values}
              key={form.placeholder + form.name}
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
