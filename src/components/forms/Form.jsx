
import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import { string, oneOf, arrayOf, shape, func } from 'prop-types';
import { AuthContext } from "../../App"
import { signUp, signIn } from "../../api/auth"
import Column from "../common/column/Column"
import Input from "../common/input/Input"
import AlertMsg from "../common/alert/AlertMsg"
import Button from "../common/button/Button";

export default function Form({ type, title, data, form, setForm, params }) {
  const [alertMsg, setAlertMsg] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');

  const history = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const request = type === 'login' ?  signIn(params) : signUp(params)
    try {
      const res = await request
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        setTypeAlertMsg("success")
        setAlertMsg("Signed in successfully!");
        setTimeout(() => history.push("/"), 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Something wrong")
    }
  }

  const handleChange = (event) =>{
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    })
  };

  const { name, email, password, confirmation } = form;
  const disabled = type === 'login' ? (!email || !password) : (!name || !email || !password || !confirmation)

  return(
    <Column>
      <h1>{title}</h1>
      {alertMsg &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
      <form className="column">
        {data.map(input => {
          const { type, name, value } = input;
          return (
            <Input
              key={name}
              type={type}
              name={name}
              value={value}
              onChange={(event) => handleChange(event)}
            />
          )
        })}
        <Button
          type="submit"
          disabled={disabled ? true : false}
          onClick={handleSubmit}
          style={disabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
        >
          Submit
        </Button>
      </form>
      {type === 'login' &&
        <div>
          Don't have an account? &nbsp;
          <Link to="/signup">
            Sign Up now!
          </Link>
        </div>
      }
    </Column>
  )
}

Form.defaultProps = {
  type: "login",
}

Form.propTypes = {
  type: oneOf(['login', 'signup']).isRequired,
  title: string.isRequired,
  data: arrayOf(
    shape({
      name: string.isRequired,
      value: string.isRequired,
      type: string.isRequired,
    })
  ),
  form: shape({
    name: string,
    email: string.isRequired,
    password: string.isRequired,
    confirmation: string,
  }),
  params: shape({
    name: string,
    email: string.isRequired,
    password: string.isRequired,
    confirmation: string,
  }),
  setForm: func.isRequired,
}
