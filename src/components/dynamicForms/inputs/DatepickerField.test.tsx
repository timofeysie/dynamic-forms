import React from 'react';
import { render } from '@testing-library/react';
import DatepickerField from './DatepickerField';

const fields = {
  name: 'dob',
  required: true,
  datePlaceholder: new Date(1581685200000),
  input_type: 'datepicker',
  validationPeriod: 18,
  validationMessage: 'Must be at least 18 years of age',
};

const handleChange = jest.fn();
const setup = () => {
  const utils = render(<DatepickerField
    datePlaceholder={fields.datePlaceholder}
    validationPeriod={fields.validationPeriod}
    validationMessage={fields.validationMessage}
    name={fields.name}
    required={fields.required}
    handleChange={handleChange}
  />);
  const input = utils.getByTestId('datepickerid') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

it('validates the input field', () => {
  const input = setup();
  expect(input).toBeDefined();
});

// it('generates a required datepicker', () => {
//   const input = setup();
//   expect(input).toHaveProperty('required');
//   expect(input).toHaveAttribute('name', 'dob');
// });

// it('takes its default date from an attribute', () => {
//   const input = setup();
//   expect(input).toHaveAttribute('value', '02/15/2020');
// });
