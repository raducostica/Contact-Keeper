import React, { createContext, useReducer } from "react";
import uuid from "uuid";

import ContactsReducer from "./ContactsReducer";

export const ContactsContext = createContext();

const ContactsProvider = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill K",
        email: "jill@email.com",
        phone: "111-111-111",
        type: "professional"
      },
      {
        id: 2,
        name: "Lopopop K",
        email: "Lpopopo@email.com",
        phone: "111-111-111",
        type: "personal"
      },
      {
        id: 3,
        name: "KFKJFKFJ K",
        email: "KJKJKH@email.com",
        phone: "111-111-111",
        type: "personal"
      },
      {
        id: 4,
        name: "Hello K",
        email: "hello@email.com",
        phone: "111-111-111",
        type: "professional"
      },
      {
        id: 5,
        name: "Jill K",
        email: "jill@email.com",
        phone: "111-111-111",
        type: "professional"
      },
      {
        id: 6,
        name: "Lopopop K",
        email: "Lpopopo@email.com",
        phone: "111-111-111",
        type: "personal"
      },
      {
        id: 7,
        name: "KFKJFKFJ K",
        email: "KJKJKH@email.com",
        phone: "111-111-111",
        type: "personal"
      },
      {
        id: 8,
        name: "Hello K",
        email: "hello@email.com",
        phone: "111-111-111",
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactsReducer, initialState);

  // ADD CONTACT
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: "ADD_CONTACT", payload: contact });
  };

  // DELETE CONTACT
  const deleteContact = id => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
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
  const updateContact = contact => {
    dispatch({ type: "UPDATE_CONTACT", payload: contact });
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
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
