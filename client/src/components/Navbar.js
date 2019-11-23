import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FaIdCard } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

import { modalContext } from "../context/modalContext/modalContext";

const Navbar = () => {
  const { openModal } = useContext(modalContext);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <h1 className="icon">
            <FaIdCard />
          </h1>
          <h3>Contact</h3>
          <button className="add-contact-btn" onClick={openModal}>
            <IoIosAddCircleOutline />
            <p className="btn-text">New</p>
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
