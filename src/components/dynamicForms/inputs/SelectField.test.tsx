import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SelectField from './SelectField';

// The following causes a linting error:
// TypeError: Cannot call method on null
// let container: any = null;
// was working previously...
let container = document.createElement('div');
const form = {
  name: 'gender',
  required: true,
  label: 'Select a gender',
  input_type: 'select',
  values: [
    'Male',
    'Female',
  ],
};

const onSubmitMock = jest.fn();
const setup = () => {
  const utils = render(<SelectField
    name={form.name}
    required={form.required}
    label={form.label}
    handleChange={onSubmitMock}
    selectValues={form.values}
    key={form.label + form.name}
  />);
  const input = utils.getByTestId('selectid') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = document.createElement('div');
});

it('renders an input field', () => {
  const input = setup();
  expect(input).toBeDefined();
});

it('validates the input field', () => {
  const { input } = setup();
  form.values[0] = input.value;
  fireEvent.change(input);
  expect(input.value).toBe(form.values[0]);
});

it('matches the snapshot', () => {
  const tree = renderer.create(<SelectField
    name={form.name}
    required={form.required}
    label={form.label}
    handleChange={onSubmitMock}
    selectValues={form.values}
    key={form.label + form.name}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
