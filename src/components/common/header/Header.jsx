// Common
import React, { useContext, useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"
import { func } from "prop-types";
import { FaRegSun, FaMoon, FaUserAlt } from 'react-icons/fa';

// Styles
import './header.css'

// Components
import { signOut } from "../../../api/auth"
import { AuthContext } from "../../../App"
import { handleCapitalize } from "../common";
import Column from "../column/Column";
import Row from "../row/Row";
import Button from "../button/Button";
import AlertMsg from "../alert/AlertMsg";

export default function Header({ onClick }){
  const [alertMsg, setAlertMsg] = useState('');
  const [typeAlertMsg, setTypeAlertMsg] = useState('');

  const { loading, isSignedIn, setIsSignedIn, currentUser, theme, exchangeRate, exchangeRateMono } = useContext(AuthContext)
  const histroy = useHistory()

  const handleSignOut = async (e) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        setTypeAlertMsg("success")
        setAlertMsg("Succeeded in sign out");
        setTimeout(() => {
          setTypeAlertMsg("")
          setAlertMsg("")
           histroy.push("/")
        }, 1000);
      }
    } catch (err) {
      setTypeAlertMsg("error")
      setAlertMsg("Failed in sign out")
    }
  }

  useEffect(() => {
    if (!isSignedIn && !currentUser) {
      setTypeAlertMsg("")
      setAlertMsg("")
    }
  }, [currentUser, isSignedIn])

  const isLogin = () => (
    <Row>
      {isSignedIn ?
        <Button
          type="button"
          onClick={handleSignOut}
          styleClass="cancel"
        >
          SIGN OUT
        </Button>
        :
        <Link
          className="button"
          to="/login"
        >
          SIGN IN
        </Link>
      }
      |
      <Link
        className="button"
        to="/signup"
      >
        SIGN UP
      </Link>
    </Row>
  )

  const AuthButtons = () => {
    if (!loading) {
      return isLogin()
    }
    return <></>
  }

  const colorTheme = theme === 'light' ? 'dark' : 'light'

  return(
    <header className={['m-column'].join(' ')}>
      <Link to="/">
        <b>Product Manage Application</b>
      </Link>
      <Column>
        <b>Privat BANK</b>
        {exchangeRate?.map(rate => {
          const {ccy, base_ccy, buy, sale } = rate;
          return(
            <Row key={ccy}>
              <b>{ccy}/{base_ccy}:&nbsp;</b>{parseFloat(buy).toFixed(2)}/{parseFloat(sale).toFixed(2)}
            </Row>
          )
        })}
      </Column>
      <Column>
        <b>Mono BANK</b>
        <Row >
          <b>EUR/UAH:&nbsp;</b>{parseFloat(exchangeRateMono.rateBuy).toFixed(2)}/{parseFloat(exchangeRateMono.rateSell).toFixed(2)}
        </Row>
      </Column>
      <Row>
        <Link to="/lists">
          Lists
        </Link>
        <Link to="/products">
          Products
        </Link>
      </Row>
      <Button
        styleClass="column"
        style={{ backgroundColor: 'transparent', color: `${theme === 'light'?  "#243949" : "#dfb886" }`}}
        onClick={() => onClick(colorTheme)}
        type="button"
      >
        {theme === 'light' ?
          <FaMoon
            size="2rem"
            color="#243949"
          /> :
          <FaRegSun
            size="2rem"
            color="#dfb886"
          />
        }
        {handleCapitalize(colorTheme)}
      </Button>
      <Column>
        <FaUserAlt size="2rem"/>
        {(isSignedIn && currentUser) && currentUser?.name}
        <AuthButtons />
      </Column>
      {alertMsg &&
        <AlertMsg
          type={typeAlertMsg}
          msg={alertMsg}
        />
      }
    </header>
  )
}

Header.propTypes = {
  onClick: func.isRequired,
}
