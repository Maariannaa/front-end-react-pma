import React from "react"
import { string, func, arrayOf } from 'prop-types';
import Column from "./column/Column";
import { handleCapitalize } from "./common";

const Select = ({ name, title, value, onChange, data }) => (
  <Column>
    <label
      htmlFor={name}
    >
      {handleCapitalize(title)}
    </label>
    <select
      name={name}
      id={name}
      value={value || "Choose..."}
      onChange={onChange}
    >
      {data.map(category =>
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      )}
    </select>
  </Column>
)

export default Select

Select.propTypes = {
  name: string.isRequired,
  title: string,
  value: string,
  onChange: func.isRequired,
  data: arrayOf(string).isRequired,
}
