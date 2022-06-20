import { node, string, object } from 'prop-types';
import './row.css';

export const Row = ({children, styleClass, style}) => <div className={[styleClass, "row"].join(" ")} style={style}>{children}</div>;

Row.propTypes = {
  children: node.isRequired,
  styleClass: string,
  style: object,
}

export default Row
