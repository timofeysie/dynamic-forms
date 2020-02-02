import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DynamicForm from "./index";

let container = null;
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
    render(<DynamicForm />, container);
  });
  const form = container.querySelector('form');
  expect(form.length).toBe(2);

  const element1 = document.forms[0];
  expect(element1.children[0].tagName).toBe('DIV');
  expect(element1.children[0].children[0].type).toBe('text');
  expect(element1.children[1].tagName).toBe('INPUT');
  expect(element1.children[1].type).toBe('submit');
});
