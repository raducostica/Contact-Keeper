import React, { createContext, useState, useContext } from "react";

import { ContactsContext } from "../contactContext/ContactsContext";

export const modalContext = createContext();

const ModalProvider = ({ children }) => {
  const contactContext = useContext(ContactsContext);
  const { clearCurrent, current } = contactContext;
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    clearCurrent();
    setModal(false);
  };

  return (
    <modalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </modalContext.Provider>
  );
};

export default ModalProvider;
