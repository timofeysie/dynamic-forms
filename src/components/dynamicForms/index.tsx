import React, { Component } from 'react';
import './style.css';
import InputTextField from './InputTextField';

class DynamicForm extends Component {
    /*eslint-disable */
    // avoid rule: State initialization should be in a constructor  
    // react/state-in-constructor
    state = {
      fields: [
        {
          name: 'email',
          required: true,
          input_type: 'text',
          placeholder: 'email',
        },
      ],
    };
    /* eslint-enable */

    submitForm = (event: any) => {
      /* eslint-disable */
      // avoid rule: 'inputFields' is assigned a value but never used  
      // no-unused-vars
      const { fields, ...inputFields } = this.state;
      /* eslint-enable */
      event.preventDefault();
    };

    handleChange = (event: any) => {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }

    render() {
      const { fields } = this.state;
      return (
        <form onSubmit={this.submitForm}>
          {fields.map((form) => {
            if (form.input_type === 'text') {
              return (
                <InputTextField
                  name={form.name}
                  placeholder={form.placeholder}
                  required={form.required}
                  key={form.placeholder}
                  handleChange={this.handleChange}
                />
              );
            }
            return <p>No form data.</p>;
          })}
          <input
            className="Submit"
            type="submit"
          />
        </form>
      );
    }
}

export default DynamicForm;
