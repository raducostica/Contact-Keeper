import React, { useContext } from "react";

import { FaPhone, FaEnvelope, FaUserAlt, FaUserTie } from "react-icons/fa";

// context
import { ContactsContext } from "../context/contactContext/ContactsContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactsContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const handleDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="contact">
      <div className="name">
        <h3>{name}</h3>
      </div>
      <ul className="contact-details-list">
        {email && (
          <li>
            {" "}
            <FaEnvelope />
            <p className="details">{email}</p>
          </li>
        )}
        {phone && (
          <li>
            <FaPhone />
            <p className="details">{phone}</p>
          </li>
        )}
        {type && (
          <li>
            {type === "personal" ? <FaUserAlt /> : <FaUserTie />}
            <p className="details details-type">{type}</p>
          </li>
        )}
      </ul>
      <p className="btn-container">
        <button className="btn btn-edit" onClick={() => setCurrent(contact)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
