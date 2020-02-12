import React from 'react';
/* eslint-disable */
import DatePicker from 'react-datepicker';
/* eslint-enable */
interface IProps {
    name: string;
    required: boolean;
    handleChange: any;
}

const DatepickerField = ({
  name, required, handleChange,
}: IProps) => (
  <div>
    <DatePicker
      selected={new Date()}
      name={name}
      required={required}
      data-testid="datepicker-id"
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
