import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="\" component={Home} />
            <Route exact path="\about" component={About} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;
