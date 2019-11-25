import React, { useContext, useEffect } from "react";

// components
import Modal from "../components/Modal";
import Contacts from "../components/Contacts";

// context
import { modalContext } from "../context/modalContext/modalContext";

import ContactsFilter from "../components/ContactsFilter";

import { AuthContext } from "../context/userContext/UserContext";

const Home = () => {
  const { modal } = useContext(modalContext);
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ContactsFilter />
      <Contacts />
      <Modal open={modal} />
    </div>
  );
};

export default Home;
