import React, { useState, useEffect } from "react"
import Column from "../common/column/Column";
import Row from "../common/row/Row";
import Button from "../common/button/Button";
import { getList, removeList } from "../../api/services";
import AlertMsg from "../common/alert/AlertMsg";
import { useHistory, useParams } from "react-router-dom";
import ProductsDetailsOfList from "../lists/ProductsDetailsOfList";
import Modal from "../common/modal/Modal";
import { RiArrowLeftLine, RiDeleteBin7Line } from "react-icons/ri";

const ListDetails = () => {
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');
  const [isEditTitleList, setIsEditTitleList] = useState(false);
  const [list, setList] = useState({});
  const [isRemoveList, setIsRemoveList] = useState(false);

  const history = useHistory();
  const { products, title, createdAt } = list;

  const handleRemoveList = async () => {
    try {
      const response = await removeList(id);

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

  const { id } = useParams()

  useEffect(() => {
    const handleGetList = async () => {
      try {
        const response = await getList(id);

        if (response.status === 200) {
          setTypeAlertMsg("success")
          setAlertMsg(response?.data?.message)
          setList(response.data);
        }
      } catch (err) {
        setTypeAlertMsg("error")
        setAlertMsg("Something wrong")
      }
    }

    handleGetList()
  }, [id])

  return (
    <div className="list">
      {(alertMsg) &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
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
            <div className="text-overflow" onClick={() => setIsEditTitleList(!isEditTitleList)}>
             {id} | {title}
            </div>
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
        <i>created at: {new Date(createdAt).toLocaleDateString()}</i>
      </Column>
      <ProductsDetailsOfList
        products={products}
        listId={id}
      />
    </div>
  )
}

export default ListDetails
