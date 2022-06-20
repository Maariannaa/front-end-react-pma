import React, { useContext } from "react"
import { bool, string, number, shape, any } from 'prop-types';
import { AuthContext } from "../../App"
import Row from "../common/row/Row";
import Column from "../common/column/Column";
import { getImage, handleCapitalize } from "../common/common";

const ProductDetailsOfList = ({ product }) => {
  const { exchangeRate } = useContext(AuthContext);

  const {
    title,
    price,
    total,
    buy,
    category,
    expiry,
    germany,
    name,
    quantity,
    shop,
    weight,
  } = product;

  return (
    <Column styleClass="details-list-product">
      <div>
        <Row>
          <Column styleClass="list-other-product">
            {getImage(category)}
            {category}
          </Column>
          <p>{handleCapitalize(title)}</p>&nbsp;|&nbsp;<i>{handleCapitalize(germany)}</i>&nbsp;|&nbsp;<b>{shop}</b>&nbsp;|&nbsp;<i>{name}</i>
        </Row>
        <hr />
        <div>bought: {new Date(buy).toLocaleDateString()}</div>
        <div>
          Take to: {new Date(expiry).toLocaleDateString()}
        </div>
        <div>
          Quantity: {quantity}/q
          <hr />
          Weight: {weight}g
        </div>
        <hr />
        <Row>
          {total}&nbsp;<b>€</b>&nbsp;
          {Math.round(exchangeRate[1]?.sale * price)}&nbsp;<b>₴</b>
        </Row>
      </div>
    </Column>
  )
}

export default ProductDetailsOfList

ProductDetailsOfList.propTypes = {
  product: shape({
    title: string,
    bought: bool,
    buy: string,
    category: string,
    createdAt: string,
    end: string,
    expiry: any,
    germany: string,
    id: number,
    keep: number,
    list_id: number,
    name: string,
    out: bool,
    price: number,
    quantity: number,
    rate: number,
    sale: bool,
    shop: string,
    total: number,
    updatedAt: string,
    user_id: number,
    weight: number,
  }).isRequired,
}
