import React from 'react';
import './App.css';
import DynamicForm from './components/dynamicForms/DynamicForm';

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
    datePlaceholder: new Date(),
    input_type: 'datepicker',
  },
];

const App = () => {
  /* eslint-disable */
  const onSubmit = (output: React.FormEvent<HTMLInputElement>) => {
    console.log('output',output);
  };
  /* eslint-enable */

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
        <DynamicForm
          fields={fields}
          onSubmit={
          (e: React.FormEvent<HTMLInputElement>) => {
            onSubmit(e);
          }
        }
        />
      </section>
    </div>
  );
};
export default App;
