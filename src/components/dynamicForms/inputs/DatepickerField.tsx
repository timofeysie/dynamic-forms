import React from 'react';
import DatePicker from 'react-datepicker';

interface IProps {
    name: string;
    required: boolean;
    handleChange: any;
}

const DatepickerField = ({
  name, required, handleChange,
}: IProps) => (
  <div data-testid="datepickerid">
    <DatePicker
      selected={new Date()}
      name={name}
      required={required}
      autoComplete="off"
      onChange={(date: Date) => {
        const newEvent = {
          currentTarget: {
            name,
            value: date?.toString(),
          },
        };
        handleChange(newEvent);
      }}
    />
  </div>
);

export default DatepickerField;
