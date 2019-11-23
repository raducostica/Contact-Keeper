import React, { useContext } from "react";

import { ContactsContext } from "../context/contactContext/ContactsContext";

// components
import ContactItem from "../components/ContactItem";

const Contacts = () => {
  const { contacts, filtered } = useContext(ContactsContext);

  if (contacts.length === 0) {
    return <h4>Please Add a Contact</h4>;
  }

  return (
    <div className="contacts-list">
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </div>
  );
};

export default Contacts;
