import React, { useContext, useRef, useEffect } from "react";
import { ContactsContext } from "../context/contactContext/ContactsContext";

const ContactsFilter = () => {
  const contactContext = useContext(ContactsContext);
  const text = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const handleChange = e => {
    if (text.current.value !== "") {
      filterContacts(text.current.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="filter-form">
      <form>
        <input
          className="filter-input"
          ref={text}
          type="text"
          placeholder="Filter Contacts..."
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default ContactsFilter;
