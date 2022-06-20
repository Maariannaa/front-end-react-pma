
import React from "react"
import { string, oneOf, bool, func, node, objectOf } from 'prop-types';
import './button.css';

export default function Button({onClick, style, children, styleClass, disabled, type}) {
  return(
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styleClass}
      style={style}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: "button",
}

Button.propTypes = {
  type: oneOf(['submit', 'button']).isRequired,
  children: node.isRequired,
  disabled: bool,
  onClick: func.isRequired,
  styleClass: string,
  style: objectOf(string),
}
