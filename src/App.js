// Common
import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import './App.css';

// Components
import SignUp from './components/pages/Signup';
import LogIn from './components/pages/Login';
import Home from './components/pages/Home';
import Lists from './components/pages/Lists';
import Layout from "./components/common/Layout"
import Products from "./components/pages/Products";
import NoMatch from "./components/pages/NoMatch";
import { rate } from "./components/common/constants";
import { getCurrentUser } from "./api/auth";
import Private from "./components/pages/Private";
import ListDetails from "./components/pages/ListDetails";
import ProductDetails from "./components/pages/ProductDetails";

export const AuthContext = createContext({})

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [theme, setTheme] = useState('light');
  const [exchangeRatePrivat, setExchangeRatePrivat] = useState(rate);
  const [exchangeRateMono, setExchangeRateMono] = useState(rate);
  const exchangeRate = exchangeRatePrivat;

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
      }
    } catch (err) {
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRIVAT_API}`)
      .then(response => response.json())
      .then(data => setExchangeRatePrivat(data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MONO_API}`)
      .then(response => response.json())
      .then(data => setExchangeRateMono(data[1]));
  }, []);

  const changeTheme = (value) => {
    setTheme(value)
  }

  return (
    <Router>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
          theme,
          exchangeRate,
          exchangeRateMono,
        }}
      >
        <Layout onClick={changeTheme}>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Private exact path="/">
              <Home />
            </Private>
            <Private path="/products/:id">
              <ProductDetails />
            </Private>
            <Private  path="/products">
              <Products />
            </Private>
            <Private path="/lists/:id">
              <ListDetails />
            </Private>
            <Private path="/lists">
              <Lists />
            </Private>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Layout>
      </AuthContext.Provider>
    </Router>
  );
};
