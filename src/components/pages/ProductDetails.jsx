import React, { useState, useContext, useEffect, useCallback } from "react"
import { AuthContext } from "../../App"
import Column from "../common/column/Column";
import Row from "../common/row/Row";
import { getProduct } from "../../api/services";
import AlertMsg from "../common/alert/AlertMsg";
import { useParams } from "react-router-dom";
import { getImage, handleCapitalize } from "../common/common";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";

const ProductDetails = () => {
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');
  const [product, setProduct] = useState({});

  const { exchangeRate } = useContext(AuthContext);
  const {
    title,
    bought,
    price,
    total,
    buy,
    category,
    createdAt,
    end,
    expiry,
    germany,
    keep,
    name,
    out,
    quantity,
    rate,
    sale,
    shop,
    updatedAt,
    weight,
  } = product;

  const { id } = useParams()

  useEffect(() => {
    const handleGetProduct = async () => {
      try {
        const response = await getProduct(id);
        if (response.status === 200) {
          setTypeAlertMsg("success")
          setAlertMsg(response?.data?.message)
          setProduct(response.data);
        }
      } catch (err) {
        setTypeAlertMsg("error")
        setAlertMsg("Something wrong")
      }
    }

    handleGetProduct()
  }, [id])

  const outlineStart = useCallback(() => {
    const start = 5 - parseInt((rate && rate) || 0);
    return (
      [...Array(start)].map((e, i) => <AiOutlineStar size="1rem" key={i} />)
    )
  }, [rate])

  return (
    <Row styleClass="list m-column">
      {(alertMsg) &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
      <Column style={{ alignItems: 'flex-start' }}>
        <Column style={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
          <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Column>
              {getImage(category)}
              {category}
            </Column>
            &nbsp;
            <h1>{handleCapitalize(title)}</h1>&nbsp;|&nbsp;<h3>{handleCapitalize(germany)}</h3>
          </Row>
          <i>Created at: {new Date(createdAt).toLocaleDateString()}</i>
          <div>
            {[...Array(rate && rate)].map((e, i) => <AiFillStar size="1rem" key={i} />)}
            {outlineStart()}
          </div>
          <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3>{shop}</h3>
            <h3>{name}</h3>
            {sale && <h3 style={{ color: "#fa4a4a" }}>SALE!</h3> }
          </Row>

        </Column>
        bought: {new Date(buy).toLocaleDateString()}
        {bought && <h3 style={{ color: "#fa4a4a" }}>BOUGHT!</h3> }
        <Column>
          <div>Out:{new Date(end).toLocaleDateString()}</div>
          <div>Need to destroy: {new Date(expiry).toLocaleDateString()}</div>
        </Column>
        {keep}
        {out}
        {quantity} {quantity === 1 ? 'item' : 'items'}
        {new Date(updatedAt).toLocaleDateString()}
        <Row style={{ justifyContent: 'space-between' }}>
          <GiWeight size="1rem" /> {weight} g
          <Row>
            {total} <b>€</b>&nbsp;
          </Row>
          <Row>{Math.round(exchangeRate[1]?.sale * price)} <b>₴</b></Row>
        </Row>
      </Column>
      <Column>
        <Row styleClass="m-column">
          <img
            className="product-image"
            src="https://images.unsplash.com/photo-1610725664338-2be2cb450798?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80"
            alt={name}
          />
          <Column style={{ alignItems: 'flex-start' }}>
            <Row>
              <h3>PRO 100g</h3> | <h3>Index: number</h3>
            </Row>
            <Row>
              <b>Season | Saison:</b> <i>May-July | Mai-Juli</i>
            </Row>
            <Row>
              <b>Carbohydrates | Kohlenhydrate:</b><i>5,5 g, davon Zucker: 5,5 g</i>
            </Row>
            <Row>
              <b>Fet | Fett:</b> <i>0,4 g</i>
            </Row>
            <Row>
              <b>Protein | Eiweiß:</b><i>0,8 g</i>
            </Row>
            <Row>
              <b>Calorific | Brennwert:</b><i>32 kcal</i>
            </Row>
            <Row>
              <b>Fiber | Ballaststoffe:</b> <i>1,6 g</i>
            </Row>
            <hr />
            <p>+...helfen dem Herz | help the heart</p>
            <p>+...liefern viel Folsäure | provide a lot of folic acid</p>
            <p>+...starken die Abwehrkraft | strengthen the immune system</p>
            <p>+...punkten mit Vitaminen | score with vitamins</p>
            <p>+...halten geistig fit | keep mentally fit</p>
            <p>+...schützen die Zellen | protect the cells</p>
            <p>+...sind super Schlankmacher | are great slimmers</p>
            <p>-...verträgt nicht jeder | not everyone tolerates</p>
          </Column>
        </Row>
      </Column>
    </Row>
  )
}

export default ProductDetails
