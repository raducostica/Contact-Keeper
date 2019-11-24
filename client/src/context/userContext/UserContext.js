import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

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

  // register user
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      console.log(res.data);

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "REGISTER_FAIL", payload: err.response.data.msg });
    }
  };

  // login user

  // logout

  // clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
