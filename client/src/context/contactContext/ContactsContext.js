import React, { createContext, useReducer } from "react";
import ContactsReducer from "./ContactsReducer";

import axios from "axios";

export const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactsReducer, initialState);

  // ADD CONTACT
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({ type: "ADD_CONTACT", payload: res.data });
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };

  // GET CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({ type: "GET_CONTACTS", payload: res.data });
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };

  // CLEAR CONTACTS
  const clearContacts = () => {
    dispatch({ type: "CLEAR_CONTACTS" });
  };

  // DELETE CONTACT
  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };

  // SET CURRENT
  const setCurrent = contact => {
    dispatch({ type: "SET_CURRENT", payload: contact });
  };

  // CLEAR CURRENT
  const clearCurrent = () => {
    dispatch({ type: "CLEAR_CURRENT" });
  };

  // UPDATE CONTACT
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({ type: "UPDATE_CONTACT", payload: res.data });
    } catch (err) {
      dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };

  // FILTER CONTACTS
  const filterContacts = text => {
    dispatch({ type: "FILTER_CONTACTS", payload: text });
  };

  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
