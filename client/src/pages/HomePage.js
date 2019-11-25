import React from "react";
import { Link } from "react-router-dom";

const HomePage = props => {
  const changePage = () => {
    props.history.push("/register");
  };
  return (
    <div className="hero-container center">
      <div className="hero-text">
        <p>
          Contact app <span>Keep track of all your contacts with ease</span>
        </p>
        <div className="hero-btn">
          <Link to="/register">REGISTER NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
