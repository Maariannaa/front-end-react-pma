import React, { useState, useContext } from "react"
import { bool, string, number, shape, any } from 'prop-types';
import { AuthContext } from "../../App"
import AlertMsg from "../common/alert/AlertMsg";
import FormProduct from "../forms/FormProduct";
import { editProduct, removeProduct } from "../../api/services";
import { useHistory } from "react-router-dom";
import { RiEditLine, RiDeleteBin7Line, RiListUnordered } from 'react-icons/ri';
import Row from "../common/row/Row";
import Modal from "../common/modal/Modal";
import Button from "../common/button/Button";
import Column from "../common/column/Column";

const ProductOfList = ({ product, listId }) => {
  const { exchangeRate, currentUser } = useContext(AuthContext);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [showModalBought, setShowModalBought] = useState(false);
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');

  const { title, bought, id, price, total } = product;
  const history = useHistory();

  const handleUpdateProduct = () => {
    setUpdateProduct(true)
  }

  const handleBoughtProduct = () => {
    setShowModalBought(true);
  }

  const handleRemoveProduct = async (id) => {
    try {
      const res = await removeProduct(id)

      if (res.status === 200) {
        setTypeAlertMsg("success")
        setAlertMsg(res?.data?.message)
        setTimeout(() => history.go("/lists"), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
  }

  const handleIsBoughtProduct = async (params) => {
    try {
      const res = await editProduct(params, id)

      if (res.status === 200) {
        setTypeAlertMsg("success")
        setAlertMsg(res.data.message)
        setTimeout(() => history.go("/lists"), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
    setShowModalBought(false);
  }

  const handleIsBought = (isBought) => {
    const productParams = {
      user_id: currentUser.id,
      list_id: listId,
      bought: isBought,
    }
    handleIsBoughtProduct(productParams)
  }

  const handleShowProduct = () => {
    history.push(`/products/${id}`)
  }

  return (
    <Column style={{ alignItems: "stretch" }}>
      {(alertMsg) &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
      <div
        className={[bought ? "bought" : " ", "row"].join(' ')}
        style={{ justifyContent: 'space-between' }}
      >
        {updateProduct &&
          <FormProduct
            product={product}
            handleCloseModal={() => setUpdateProduct(false)}
            type="old"
            listId={listId}
          />
        }
        {showModalBought &&
          <Modal
            title="Did you but this product?"
            onClick={() => setShowModalBought(false)}
          >
            <Row>
              <Button
                type="button"
                onClick={() => handleIsBought(true)}
              >
                Yes
              </Button>
              <Button
                type="button"
                onClick={() => handleIsBought(false)}
                styleClass="cancel"
              >
                No
              </Button>
            </Row>
          </Modal>
        }
        <Row style={{width: '150px', justifyContent: 'flex-start' }}>
          <input
            name="bought"
            checked={bought}
            type="checkbox"
            onChange={() => handleBoughtProduct(id, listId)}
          />
          <p className="text-overflow">{title}</p>
        </Row>
        <Row>
          {total} <b>€</b>&nbsp;
        </Row>
        <Row>{Math.round(exchangeRate[1]?.sale * price)} <b>₴</b></Row>
        <Row>
          <Button
            type="button"
            onClick={handleShowProduct}
            style={{ backgroundColor: 'transparent', color: "#00a3ce" }}
          >
            <RiListUnordered style={{ cursor: 'pointer' }} size="1.2rem"/>
          </Button>
          <Button
            type="button"
            onClick={() => handleUpdateProduct(id, listId)}
            style={{ backgroundColor: 'transparent', color: "#00a3ce" }}
          >
            <RiEditLine style={{ cursor: 'pointer' }} size="1.2rem"/>
          </Button>
          <Button
            type="button"
            styleClass="cancel"
            style={{ backgroundColor: 'transparent', color: '#fa4a4a' }}
            onClick={() => handleRemoveProduct(id)}
          >
            <RiDeleteBin7Line style={{ cursor: 'pointer' }} size="1.2rem" />
          </Button>
        </Row>
      </div>
    </Column>
  )
}

export default ProductOfList

ProductOfList.propTypes = {
  product: shape({
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
  }).isRequired,
  listId: number.isRequired,
}
