import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/Navbar";

// context
import ModalProvider from "./context/modalContext/modalContext";
import ContactsProvider from "./context/contactContext/ContactsContext";
import AuthProvider from "./context/userContext/UserContext";

// pages
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <ModalProvider>
          <Fragment>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Router>
          </Fragment>
        </ModalProvider>
      </ContactsProvider>
    </AuthProvider>
  );
}

export default App;
