import React from 'react';

interface IProps {
    name: string;
    required: boolean;
    label: string;
    handleChange: any;
    selectValues: string [];
}

/** Issue # 5: Add gender */
const SelectField = ({
  name, required, handleChange, selectValues,
}: IProps) => (
  <div data-testid="selectid">
    {/* <label>{label}</label> TODO: decide on layout including labels */}
    <select
      name={name}
      required={required}
      onChange={handleChange}
    >
      <option value="">Select</option>
      {selectValues.map((values, i) => <option value={i} key={values + name}>{values}</option>)}
    </select>
  </div>
);

export default SelectField;
