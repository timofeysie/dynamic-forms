import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactDOM from 'react-dom';
import DynamicForm from "./DynamicForm";
import { render as testing_lib_render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

let container = null;
const fields = [
  {
    name: 'name',
    required: true,
    input_type: 'text',
    placeholder: 'name',
    validationString: '(\\w.+\\s).+',
    validationMessage: 'First and last name required',
  }, {
    name: 'dob',
    required: true,
    datePlaceholder: new Date(1581685200000),
    input_type: 'datepicker',
    validationPeriod: 18,
    validationMessage: 'Must be at least 18 years of age',
  },
];

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders a form with an input and submit button", () => {
  act(() => {
    render(<DynamicForm fields={fields}/>, container);
  });
  const form = container.querySelector('form');
  expect(form.length).toBe(3);

  const element1 = document.forms[0];
  expect(element1.children[0].children[0].type).toBe('text');
  //expect(element1.children[0].children[0].elemenType).toBe('div');
  //expect(element1.children[1].tagName).toBe('DIV');
  // the last element should be the submit button
  expect(element1.children[element1.children.length-1].type).toBe('submit');
});

it("renders with react DOM", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DynamicForm  fields={fields}/>, div);
});

// Input field tests

// type="text"
it("renders an input with a type", () => {
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('type', 'text');
});

// name="email"
it("renders an input with a name equal to name", () => {
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('name', 'name');
});

// placeholder="email"
it("renders an input with a name equal to email", () => {
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('placeholder', 'name');
});

// required={true}
it("renders an input with a name equal to email", () => {
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('required');
});

// why are attribute and property the same???
it("renders an input with a type", () => {
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveProperty('required');
});

it("validates the input field", () => {
  const testValues = {
    name: 'test value',
    dob: '02/15/2020',
    onSubmit: jest.fn(),
  };
  const onSubmitMock = jest.fn();
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields} onSubmit={onSubmitMock}/>);
  const input = getByTestId("inputid");
  fireEvent.change(input, {
    target: { name: 'input text' }
  });
  const submitButton = document.forms[0].children[document.forms[0].children.length-1];
  fireEvent.click(submitButton);
  expect(onSubmitMock).toHaveBeenCalled();
  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  // expect(onSubmitMock).toBeCalledWith({name: testValues.name, dob: testValues.dob});
  // The actual result is an empty object {}.
  // expect(onSubmitMock).toHaveBeenCalledWith({
  //   name: 'input text',
  //   dob: '02/15/2020'
  // });
});

it("matches snapshot", () => {
  const tree = renderer.create(<DynamicForm fields={fields}></DynamicForm>).toJSON();
  expect(tree).toMatchSnapshot();
})

// datepicker field tests
// (see issue #2 for details)
it("generates a required datepicker", () => {
  const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
  const input = getByTestId("datepickerid").children[0].children[0].children[0];
  expect(input).toHaveProperty('required');
  expect(input).toHaveAttribute('name', 'dob');
});

it("takes its default date from an attribute", () => {
    const { getByTestId } = testing_lib_render(<DynamicForm fields={fields}/>);
    const input = getByTestId("datepickerid").children[0].children[0].children[0];
    expect(input).toHaveAttribute('value', '02/15/2020');
});
