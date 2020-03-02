import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';
import DatepickerField from './DatepickerField';
import 'moment-timezone';

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
  moment.tz.add([
    'Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5',
  ]);
  moment.tz.setDefault('Australia/Sydney');
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
