import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

interface IProps {
  name: string;
  required: boolean;
  handleChange: any;
  datePlaceholder: Date;
  validationPeriod: number,
  validationMessage: string;
}

/**
 * Validate the user to be at least as olf as the validation period argument.
 * @param birthday Date indicating the age of a user.
 * @param validationPeriod number indicating a minimum age differential (18 = 18 years or older).
 */
function underAgeValidate(birthday: Date, validationPeriod: number) {
  const currentDate = new Date().getTime();
  const age = (currentDate - birthday.getTime()) / (31557600000);
  if (age < validationPeriod) {
    return false;
  }
  return true;
}

const DatepickerField = ({
  name, required, handleChange, datePlaceholder, validationPeriod, validationMessage,
}: IProps) => {
  const [valid, setValid] = useState(false);
  const [newDate, setNewDate] = useState(datePlaceholder);
  return (
    <div data-testid="datepickerid">
      <DatePicker
        name={name}
        required={required}
        autoComplete="off"
        selected={newDate}
        onChange={(date: Date) => {
          const newEvent = {
            currentTarget: {
              name,
              value: date?.toLocaleDateString(),
            },
          };
          setNewDate(date);
          setValid(underAgeValidate(date, validationPeriod));
          // TODO: pass up validation situation to the parent component
          handleChange(newEvent);
        }}
      />
      {!valid && <div>{validationMessage}</div>}
    </div>
  );
};

export default DatepickerField;
