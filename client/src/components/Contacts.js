import React, { useContext, useEffect } from "react";

import { ContactsContext } from "../context/contactContext/ContactsContext";

// components
import ContactItem from "../components/ContactItem";
import Loading from "../components/Loading";

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(
    ContactsContext
  );

  useEffect(() => {
    getContacts();
    // eslint-disable
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <div>
      {contacts !== null && !loading ? (
        <div className="contacts-list">
          {filtered !== null
            ? filtered.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map(contact => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Contacts;
