import React, { useContext } from "react"
import { arrayOf, number, string, shape, bool, any } from 'prop-types';
import { AuthContext } from "../../App"
import { FaClipboardList } from 'react-icons/fa';
import Column from "../common/column/Column";
import Row from "../common/row/Row";
import { totalPrice } from "../common/common";
import ProductDetailsOfList from "./ProductDetailsOfList";

const ProductsDetailsOfList = ({ products, listId }) => {
  const { exchangeRate } = useContext(AuthContext);

  return (
    <>
      {products?.length === 0 ?
        <Column >
          <FaClipboardList size="8rem" style={{margin: "15%"}}/>
          <h3>Empty...</h3>
        </Column>
      :
        <Column style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {products?.map(product => (
              <ProductDetailsOfList
                key={product.id}
                product={product}
                listId={listId}
              />
            ))
          }
          <Row style={{ justifyContent: 'space-around' }}>
            <p>Total:&nbsp;</p>
            <b>{totalPrice(products)} €</b> &nbsp;|&nbsp;
            <i>{Math.round(exchangeRate[1]?.sale * totalPrice(products))} ₴</i>
          </Row>
        </Column>
      }
    </>
  )
}

ProductsDetailsOfList.propTypes = {
  products: arrayOf(shape({
    title: string,
    bought: bool,
    buy: string,
    category: string,
    created_at: string,
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
    updated_at: string,
    user_id: number,
    weight: number,
  })),
  listId: string.isRequired,
}

export default ProductsDetailsOfList;
