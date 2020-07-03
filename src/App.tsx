/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React from 'react';
// @ts-ignore
import TinCan from 'tincanjs';
import './App.css';
// @ts-ignore
import DynamicForm from './components/dynamicForms/DynamicForm';
import Cmi5App from './components/cmi5/Cmi5App';

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
  const query = new URLSearchParams();
  const token = query.get('token');
  console.log('token', token);
  /* eslint-disable */
  /* The above line is also needed to exclude the console log. */
  /* It's temporary, so when no longer needed remove this and the log. */
  const onSubmit = (output: React.FormEvent<HTMLInputElement>) => {
    console.log("output", output);
    const tincan = new TinCan({
      recordStores: [
        {
          endpoint: "https://sample-lrs-onlunez.lrs.io/xapi/",
          username: "username",
          password: "password",
          allowFail: false,
        },
      ],
    });
    tincan.sendStatement(
      {
        actor: {
          mbox: "mailto:timofeyc@hotmail.com",
        },
        verb: {
          id: "http://adlnet.gov/expapi/verbs/attempted",
        },
        target: {
          id: "https://experienceapi.com/activities/sending-my-first-statement",
        },
      },
      function (err: any, result: any) {
        //Handle any errors here. This code just outputs the result to the page.
        console.log(err, result)
      }
    );
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
          <Cmi5App />
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
