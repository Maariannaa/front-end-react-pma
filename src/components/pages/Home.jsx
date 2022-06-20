import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../App"
import { products } from '../common/constants';
import NeedToBuy from "../lists/NeedToBuy";
import NewList from "../forms/NewList";
import { GetDoughnut } from "../Statistics";
import Column from "../common/column/Column";
import { totalPrice } from "../common/common";
import AlertMsg from "../common/alert/AlertMsg";
import Row from "../common/row/Row";

const Home = () => {
  const { currentUser, isSignedIn} = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState(products);
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');

  useEffect(() => {
    if (currentUser) {
    fetch(`${process.env.REACT_APP_BACKEND_API}/products`)
      .then(response => response.json())
      .then(data => setAllProducts(data));
    }
  }, [currentUser]);

  useEffect(() => {
    if(isSignedIn && currentUser) {
      setTypeAlertMsg("success")
      setAlertMsg("You signed in successfully")
    } else {
      setTypeAlertMsg("error")
      setAlertMsg("You are not signed in")
    }
    if (currentUser) {
      setTypeAlertMsg("")
      setAlertMsg("")
    }
  }, [currentUser, isSignedIn]);

  return (
    <Column>
      {(isSignedIn && currentUser) && (
        (alertMsg) &&
          <AlertMsg
            type={typeAlertMsg}
            msg={alertMsg}
          />
      )}
      <Row styleClass="m-column">
        <NewList />
        <NeedToBuy />
        <Column>
          <GetDoughnut />
          <p>
            <b> You already spend: </b>
            <i>{totalPrice(allProducts)} €</i>
          </p>
        </Column>
      </Row>
    </Column>
  )
}

export default Home
