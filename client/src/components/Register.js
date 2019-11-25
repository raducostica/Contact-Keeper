import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../context/userContext/UserContext";

const Register = props => {
  const authContext = useContext(AuthContext);

  const { register, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.log("nope");
    } else if (password !== password2) {
      console.log("hell nope");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="hero-container">
      <div className="register-form-container">
        <div className="form-background">
          <form onSubmit={handleSubmit} className="form register-form">
            <div className="form-title reg-form-title">
              <p>Register</p>
            </div>
            {/* <div className="form-inputs"> */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password2">Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            <button type="submit" className="btn-register">
              Register
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
