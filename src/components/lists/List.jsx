import React, { useState } from "react"
import { any, arrayOf, bool, number, shape, string } from 'prop-types';
import { newProduct } from '../common/constants';
import FormProduct from "../forms/FormProduct";
import Column from "../common/column/Column";
import Row from "../common/row/Row";
import Button from "../common/button/Button";
import ProductsOfList from "./ProductsOfList";
import { editTitleList, removeList } from "../../api/services";
import AlertMsg from "../common/alert/AlertMsg";
import { Link, useHistory } from "react-router-dom";
import Input from "../common/input/Input";
import Modal from "../common/modal/Modal";
import { RiArrowLeftLine, RiDeleteBin7Line } from "react-icons/ri";

const List = ({products, created_at, title, listId }) => {
  const [createProduct, setCreateProduct] = useState(false);
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');
  const [isEditTitleList, setIsEditTitleList] = useState(false);
  const [isRemoveList, setIsRemoveList] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const history = useHistory();

  const handleCreateProduct = () => {
    setCreateProduct(true);
  }

  const handleRemoveList = async () => {
    try {
      const response = await removeList(listId);

      if (response.status === 200) {
        setTypeAlertMsg("success")
        setAlertMsg(response?.data?.message)
        setTimeout(() => history.go("/lists"), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
  }

  const params = {
    title: newTitle,
  }

  const handleEditTitleOfList = async () => {
    try {
      const response = await editTitleList(params, listId)
      if (response.status === 200) {
        setTypeAlertMsg("success")
        setAlertMsg(response?.data?.message)
        setTimeout(() => history.go("/lists"), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
  }

  const handleChange = (event) => {
    setNewTitle(event.target.value)
  }

  return (
    <div className="list">
      {(alertMsg) &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
      {createProduct &&
        <FormProduct
          product={newProduct}
          handleCloseModal={() => setCreateProduct(false)}
          type="new"
          listId={listId}
        />
      }
      {isRemoveList &&
       <Modal
          title="Are you sure you want to remove the list?"
          onClick={() => setIsRemoveList(false)}
        >
          <Button
            type="button"
            onClick={handleRemoveList}
          >
            Yes
          </Button>
          <Button
            type="button"
            onClick={() => setIsRemoveList(false)}
            styleClass="cancel"
          >
            No
          </Button>
        </Modal>
      }
      <Column style={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Button
            type="button"
            style={{ backgroundColor: 'transparent', color: '#00a3ce' }}
            onClick={() => history.goBack()}
          >
            <RiArrowLeftLine style={{ cursor: 'pointer' }} size="1.2rem" />
          </Button>
          <h2>
            {isEditTitleList ?
              <Row>
                <Input
                  type="text"
                  name="title"
                  value={newTitle}
                  onChange={(event) => handleChange(event)}
                />
                <Button
                  type="button"
                  onClick={handleEditTitleOfList}
                >
                  Save
                </Button>
              </Row>
            :
            <div className="text-overflow" onClick={() => setIsEditTitleList(!isEditTitleList)}>
             {listId} | {title}
            </div>
            }
          </h2>
          <Button
            type="button"
            styleClass="cancel"
            style={{ backgroundColor: 'transparent', color: '#fa4a4a' }}
            onClick={() => setIsRemoveList(true)}
          >
            <RiDeleteBin7Line style={{ cursor: 'pointer' }} size="1.2rem" />
          </Button>
        </Row>
        <i>created_at: {new Date(created_at).toLocaleDateString()}</i>
      </Column>
      <ProductsOfList
        products={products}
        listId={listId}
      />
      <Row style={{ justifyContent: 'space-around' }}>
        <Button
          type="button"
          onClick={handleCreateProduct}
        >
          Create new product
        </Button>
        <Link to={`lists/${listId}`}>Details...</Link>
      </Row>
    </div>
  )
}

List.propTypes = {
  title: string.isRequired,
  listId: number.isRequired,
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
  })).isRequired,
  created_at: string,
}

export default List
