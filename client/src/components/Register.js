import React, { useState, useContext } from "react";

import { AuthContext } from "../context/userContext/UserContext";

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register } = authContext;

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
      setUser({
        name: "",
        email: "",
        password: "",
        password2: ""
      });
    }
  };

  return (
    <div className="register-form-container">
      <div className="form-background">
        <form onSubmit={handleSubmit} className="form register-form">
          <div className="form-title">
            <h3>Register</h3>
          </div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
