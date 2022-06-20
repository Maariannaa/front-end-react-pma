import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../App"
import { lists } from '../common/constants';
import Row from "../common/row/Row";
import NewList from "../forms/NewList";
import List from "./List";

const AllLists = () => {
  const { currentUser } = useContext(AuthContext);
  const [allListOfProducts, setAllListOfProducts] = useState(lists);

  useEffect(() => {
    if (currentUser) {
      fetch(`${process.env.REACT_APP_BACKEND_API}/lists`)
        .then(response => response.json())
        .then(data => setAllListOfProducts(data || lists));
    }
  }, [currentUser]);

  return (
    <Row styleClass="m-column" style={{ flexWrap: 'wrap' }}>
      <NewList />
      {allListOfProducts?.map(list => {
        const { id, title, products, created_at } = list;
        return (
          <List
            key={id}
            listId={id}
            title={title}
            products={products}
            created_at={created_at}
          />
        )
      })}
    </Row>
  )
}

export default AllLists
