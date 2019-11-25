import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/userContext/UserContext";

import { FaIdCard } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

import { modalContext } from "../context/modalContext/modalContext";
import { ContactsContext } from "../context/contactContext/ContactsContext";

const Navbar = () => {
  const { openModal } = useContext(modalContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { clearContacts } = useContext(ContactsContext);

  const handleLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <React.Fragment>
      <li>
        <a onClick={handleLogout} href="#!">
          Logout
        </a>
      </li>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </React.Fragment>
  );

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <h1 className="icon">
            <FaIdCard />
          </h1>
          <h3>Contact</h3>
          {isAuthenticated ? (
            <button className="add-contact-btn" onClick={openModal}>
              <IoIosAddCircleOutline />
              <p className="btn-text">New</p>
            </button>
          ) : (
            <></>
          )}
        </div>
        <ul className="nav-links">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
