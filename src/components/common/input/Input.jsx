import React from "react"
import { any, func, string } from "prop-types";
import { handleCapitalize } from '../common';
import Column from "../column/Column";
import './input.css';

const Input = ({ name, value, type, onChange }) => (
  <Column>
    <label htmlFor={name}>{handleCapitalize(name)}</label>
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={handleCapitalize(name)}
      name={name}
    />
  </Column>
)

Input.propTypes = {
  name: string.isRequired,
  value: any.isRequired,
  type: string.isRequired,
  onChange: func.isRequired,
}

export default Input
