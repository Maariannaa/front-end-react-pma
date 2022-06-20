import React from "react"
import { string } from 'prop-types';
import './alert.css';

const AlertMsg = ({ type, msg }) => <p className={type}>{msg}</p>

AlertMsg.propTypes = {
  type: string.isRequired,
  msg: string.isRequired,
}

export default AlertMsg;
