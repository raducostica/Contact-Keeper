import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/userContext/UserContext";

const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("nope");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="hero-container">
      <div className="register-form-container">
        <div className="form-background">
          <div className="form-title">
            <p>Login</p>
          </div>
          <form onSubmit={handleSubmit} className="form login-form">
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
            <button type="submit" className="btn-register">
              Login
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
