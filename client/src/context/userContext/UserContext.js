import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({ type: "USER_LOADED", payload: res.data });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  // register user
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      console.log(res);
      // res.data = token
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: "REGISTER_FAIL", payload: err.response.data.msg });
    }
  };

  // login user
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      // res.data = token
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err.response.data.msg });
    }
  };

  // logout
  const logout = () => dispatch({ type: "LOGOUT" });

  // clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
