import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/Navbar";

// context
import ModalProvider from "./context/modalContext/modalContext";
import ContactsProvider from "./context/contactContext/ContactsContext";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <ContactsProvider>
      <ModalProvider>
        <Fragment>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Router>
        </Fragment>
      </ModalProvider>
    </ContactsProvider>
  );
}

export default App;
