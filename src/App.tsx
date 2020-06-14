/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import React from 'react';
import './App.css';
// @ts-ignore
import Cmi5AU from 'react-cmi5';
import DynamicForm from './components/dynamicForms/DynamicForm';
import ExampleQuestion from './components/ExampleQuestion';

const fields = [
  {
    name: 'name',
    required: true,
    input_type: 'text',
    placeholder: 'name',
    validationString: '(\\w.+\\s).+',
    validationMessage: 'First and last name required',
  },
  {
    name: 'dob',
    required: true,
    datePlaceholder: new Date(
      new Date().getTime() - 365 * 24 * 60 * 60 * 19000,
    ),
    input_type: 'datepicker',
    validationPeriod: 18,
    validationMessage: 'Must be at least 18 years of age',
  },
  {
    name: 'gender',
    required: true,
    label: 'Select gender',
    input_type: 'select',
    values: ['Male', 'Female'],
  },
];

const App = () => {
  /* eslint-disable */
  /* The above line is also needed to exclude the console log. */
  /* It's temporary, so when no longer needed remove this and the log. */
  const onSubmit = (output: React.FormEvent<HTMLInputElement>) => {
    console.log("output", output);
  };

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with React
        </a>
      </header>
      <section className="Sections">
        <Cmi5AU>
          <ExampleQuestion />
        </Cmi5AU>
      </section>
      <section className="Sections">
        <DynamicForm
          fields={fields}
          onSubmit={(e: React.FormEvent<HTMLInputElement>) => {
            onSubmit(e);
          }}
        />
      </section>
    </div>
  );
};
export default App;
