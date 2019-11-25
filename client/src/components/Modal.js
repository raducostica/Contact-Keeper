import React, { useContext, useState, useEffect } from "react";

import { modalContext } from "../context/modalContext/modalContext";
import { ContactsContext } from "../context/contactContext/ContactsContext";

const Modal = ({ open }) => {
  const { closeModal, openModal } = useContext(modalContext);
  const contactContext = useContext(ContactsContext);

  const { addContact, current, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
      openModal();
      console.log("hello");
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current, openModal]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
    closeModal();
  };
  return (
    <>
      {open ? (
        <div className="modal-background">
          <div className="modal-container">
            <form className="add-contact-form" onSubmit={handleSubmit}>
              <h3>{current ? "Edit Contact" : "Add Contact"}</h3>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Contact Name"
                className="text-input"
                onChange={handleChange}
              />
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Contact Email"
                className="text-input"
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Contact Phone Number"
                value={phone}
                className="text-input"
                onChange={handleChange}
              />
              <div className="form-radio-type">
                <div className="radio-input-div">
                  <input
                    type="radio"
                    name="type"
                    value="personal"
                    checked={type === "personal"}
                    className="radio-input"
                    onChange={handleChange}
                  />
                  Personal{" "}
                </div>
                <div>
                  <input
                    type="radio"
                    name="type"
                    value="professional"
                    checked={type === "professional"}
                    className="radio-input"
                    onChange={handleChange}
                  />
                  Professional
                </div>
              </div>
              <div className="btn-div">
                <button type="submit" className="add-contact-form-btn">
                  {current ? "Edit Contact" : "Add Contact"}
                </button>
                <button className="add-contact-form-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
