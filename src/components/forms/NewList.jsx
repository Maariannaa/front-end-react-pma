import React, { useState, useContext } from "react"
import { newList } from "../../api/services";
import { useHistory } from "react-router-dom";
import AlertMsg from "../common/alert/AlertMsg";
import Column from "../common/column/Column";
import Row from "../common/row/Row";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import { AuthContext } from "../../App";

const NewList = () => {
  const [addNewList, setAddNewList] = useState(false);
  const [alertMsg, setAlertMsg ] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');
  const [title, setTitle] = useState("")

  const { currentUser } = useContext(AuthContext);
  const params = {
    title,
    user_id: currentUser.id,
  }
  const history = useHistory()

  const handleSaveNewList = async (e) => {
    try {
      const res = await newList(params)

      if (res.status === 200) {
        setTypeAlertMsg("success")
        setAlertMsg("Create new list successfully!")
        setTimeout(() => history.push(`/lists`), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
  }

  const handleCancelCreateList = () => {
    setAddNewList(false)
    setAlertMsg("")
  }

  return (
    <Column>
      <h2>Create new list</h2>
      {alertMsg &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
      {addNewList ?
        <>
          <Input
            type="text"
            onChange={event => setTitle(event.target.value)}
            value={title}
            name="title"
          />
          <Row>
            <Button
              type="button"
              onClick={handleSaveNewList}
            >
              Save List
            </Button>
            <Button
              type="button"
              styleClass="cancel"
              onClick={handleCancelCreateList}
            >
              Cancel
            </Button>
          </Row>
        </>
        :
        <Button
          type="button"
          styleClass="btn-add-new-list"
          onClick={() => setAddNewList(!addNewList)}
        >
          +
        </Button>
      }
    </Column>
  )
}

export default NewList
