import React, { useState, useCallback , useContext } from "react"
import { bool, func, number, oneOf, shape, string, } from 'prop-types';
import { AuthContext } from "../../App"
import { categories, shops } from '../common/constants';
import { editProduct, newProduct } from "../../api/services";
import AlertMsg from "../common/alert/AlertMsg";
import Input from "../common/input/Input";
import { useHistory } from "react-router-dom";
import Row from "../common/row/Row";
import Column from "../common/column/Column";
import Select from "../common/Select";
import Button from "../common/button/Button";
import Modal from "../common/modal/Modal";

const FormProduct = ({ product, handleCloseModal, type, listId }) => {
  const { currentUser } = useContext(AuthContext);
  const { id } = product;
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');
  const [productFields, setProductFields] = useState({
    title: product?.title,
    category: product?.category,
    germany: product?.germany,
    quantity: product?.quantity,
    weight: product?.weight,
    price: product?.price,
    bought: product?.bought,
    end: product?.end,
    expiry: product?.expiry,
    keep: product?.keep,
    shop: product?.shop,
    sale: product?.sale,
    out: product?.out,
    rate: product?.rate,
    total: product?.total,
    buy: product?.buy,
  });

  const {
    title,
    category,
    germany,
    quantity,
    weight,
    price,
    buy,
    end,
    expiry,
    keep,
    shop,
    sale,
    out,
    rate,
    total,
    bought,
  } = productFields;

  const productParams = {
    user_id: currentUser.id,
    list_id: listId,
    title: title,
    category: category,
    germany: germany,
    quantity: quantity,
    weight: weight,
    price: price,
    buy: buy,
    end: end,
    expiry: expiry,
    keep: keep,
    shop: shop,
    sale: sale,
    out: out,
    rate: rate,
    total: total,
    bought: bought,
  }

  const history = useHistory();
  const totalPrice = parseFloat(productFields?.price) * productFields?.quantity;

  const handleSaveEditedProduct = async (id) => {
    try {
      const res = type === "old" ? await editProduct(productParams, id) : await newProduct(productParams);
      const msg = type === "old" ? "Edit product successfully!" : "New product create successfully!"

      if (res.status === 200) {
        setTypeAlertMsg("success")
        setAlertMsg(msg)
        setTimeout(() => history.go("/lists"), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
  }

  const handleProduct = useCallback((event) =>{
    const { name, value } = event.target;

    setProductFields({
      ...productFields,
      total: totalPrice,
      [name]: value
    })
  }, [totalPrice, productFields]);

  const data = [
    {
      name: "title",
      value: title,
      type: "text",
    },
    {
      name: "germany",
      value: germany,
      type: "text",
    },
    {
      name: "quantity",
      value: quantity,
      type: "number",
    },
    {
      name: "weight",
      value: weight,
      type: "number",
    },
    {
      name: "price",
      value: price,
      type: "number",
    },
  ]

  const dateData = [
    {
      name: "buy",
      value: buy,
      type: "date",
    },
    {
      name: "end",
      value: end,
      type: "date",
    },
    {
      name: "expiry",
      value: expiry,
      type: "date",
    },
    {
      name: "rate",
      value: rate,
      type: "number",
    },
  ]

  const renderInputs = (data) => (
    <Column>
      {data.map(input => {
        const { type, name, value } = input;
        return (
          <Input
            key={name}
            type={type}
            name={name}
            value={type === 'date' ? value?.split("T").shift() : value}
            onChange={(event) => handleProduct(event)}
          />
        )
      })}
    </Column>
  )

  return (
    <Modal
      title={`${type === "old" ? "Edit" : "New" } product`}
      onClick={handleCloseModal}
    >
      {alertMsg &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
      <Row>
        {renderInputs(data)}
        <Column>
          <Select
            name="category"
            title="category"
            value={category}
            onChange={(event) => handleProduct(event)}
            data={categories}
          />
          <Select
            name="shop"
            title="shop"
            value={shop}
            onChange={(event) => handleProduct(event)}
            data={shops}
          />
          {renderInputs(dateData)}
        </Column>
      </Row>
      <Row>
        Total: {totalPrice}
        <Row>
          <label htmlFor="sale">Sale??</label>
          <input
            name="sale"
            checked={sale}
            type="checkbox"
            onChange={() => setProductFields({ ...productFields, sale: !sale })}
          />
        </Row>
      </Row>
      <Row>
        <Button
          type="button"
          onClick={() => handleSaveEditedProduct(id)}
        >
          Save product
        </Button>
        <Button
          type="button"
          onClick={handleCloseModal}
          styleClass="cancel"
        >
          Cancel
        </Button>
      </Row>
    </Modal>
  )
}

FormProduct.propTypes = {
  product: shape({
    title: string,
    category: string,
    germany: string,
    quantity: number,
    weight: number,
    price: number,
    buy: string,
    end: string,
    expiry: string,
    keep: number,
    shop: string,
    sale: bool,
    total: number,
    rate: number,
    out: bool,
    bought: bool,
    list_id: number,
  }).isRequired,
  handleCloseModal: func.isRequired,
  type: oneOf(['old', 'new']).isRequired,
  listId: number.isRequired,
}

export default FormProduct
