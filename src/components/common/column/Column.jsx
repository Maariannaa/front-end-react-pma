import { node, string, object, oneOfType, element } from 'prop-types';
import './column.css';

const Column = ({children, styleClass, style}) => <div className={[styleClass, "column"].join(" ")} style={style}>{children}</div>;

Column.propTypes = {
  children: oneOfType([ node.isRequired, element.isRequired ]).isRequired,
  styleClass: string,
  style: object,
}

export default Column
