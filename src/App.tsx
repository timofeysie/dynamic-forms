import React from 'react';
import './App.css';
import DynamicForm from './components/dynamicForms/index';

const App = () => (
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
      <DynamicForm />
    </section>
  </div>
);

export default App;
