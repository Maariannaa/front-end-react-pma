import React from "react"
import { node, func, string } from 'prop-types';
import './modal.css';
import Button from "../button/Button";
import Row from "../row/Row";

const Modal = ({ onClick, children, title }) => (
  <div className="modal" id="modal">
    <div className="modal-content">
      <Row style={{ justifyContent: 'space-around' }}>
        <h3>{title}</h3>
        <Button
          type="button"
          styleClass="close"
          onClick={onClick}
        >
          <div>X</div>
        </Button>
      </Row>
      {children}
    </div>
  </div>
)

Modal.propTypes = {
  onClick: func.isRequired,
  children: node.isRequired,
  title: string,
}

export default Modal;
