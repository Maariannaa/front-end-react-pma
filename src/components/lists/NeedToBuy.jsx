import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import { products } from '../common/constants';
import Row from "../common/row/Row";
import Column from "../common/column/Column";
import './list.css';
import { getImage } from "../common/common";

const NeedToBuy = () => {
  const { currentUser } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    if (currentUser) {
    fetch(`${process.env.REACT_APP_BACKEND_API}/products`)
      .then(response => response.json())
      .then(data => setAllProducts(data));
    }
  }, [currentUser]);

  const needToBuy = allProducts?.filter(item => item.bought === false)

  return (
    <Row styleClass="m-column">
      <Column>
        <h2>Products need to buy:</h2>
        <Row styleClass="list-other">
          {needToBuy.map(product => {
            const { id, title, category } = product;
            return (
              <div
                key={id}
                className="list-other-product"
              >
                {getImage(category)}
                <b className="text-overflow" style={{ textAlign: "center" }}>{title}</b>
              </div>
            )
          })}
        </Row>
      </Column>
    </Row>
  )
}

export default NeedToBuy
