import React, { useContext } from "react";

// components
import Modal from "../components/Modal";
import Contacts from "../components/Contacts";

// context
import { modalContext } from "../context/modalContext/modalContext";

import ContactsFilter from "../components/ContactsFilter";

const Home = () => {
  const { modal } = useContext(modalContext);
  return (
    <div>
      <ContactsFilter />
      <Contacts />
      <Modal open={modal} />
    </div>
  );
};

export default Home;
