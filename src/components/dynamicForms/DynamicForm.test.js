import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactDOM from 'react-dom';
import DynamicForm from "./DynamicForm";
import { render as render2 } from "@testing-library/react";
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
    input_type: 'datepicker',
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
  expect(element1.children[1].tagName).toBe('DIV');
  expect(element1.children[1].type).toBe('submit');
});

it("renders with react DOM", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DynamicForm  fields={fields}/>, div);
});

// Input field tests

// type="text"
it("renders an input with a type", () => {
  const { getByTestId } = render2(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('type', 'text');
});

// name="email"
it("renders an input with a name equal to name", () => {
  const { getByTestId } = render2(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('name', 'name');
});

// placeholder="email"
it("renders an input with a name equal to email", () => {
  const { getByTestId } = render2(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('placeholder', 'name');
});

// required={true}
it("renders an input with a name equal to email", () => {
  const { getByTestId } = render2(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveAttribute('required');
});

// why are attribute and property the same???
it("renders an input with a type", () => {
  const { getByTestId } = render2(<DynamicForm fields={fields}/>);
  expect(getByTestId("inputid")).toHaveProperty('required');
});

it("matches snapshot", () => {
  const tree = renderer.create(<DynamicForm fields={fields}></DynamicForm>).toJSON();
  expect(tree).toMatchSnapshot();
})

// datepicker field tests

// name="datepicker"
it("renders an input with a name datepicker", () => {
    const { getByTestId } = render2(<DynamicForm fields={fields}/>);
    expect(getByTestId("datepickerid")).toHaveAttribute('name', 'dob');
});
