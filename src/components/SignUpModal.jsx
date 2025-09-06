import ModalWithForm from "./ModalWithForm";
import { useContext, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";

const SignUpModal = ({ handleCloseModal, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { activeModal } = useContext(PageDataContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({ name, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Create Account"
      isOpen={activeModal === "signUp"}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmitForm}
    >
      <label htmlFor="SignUpName" className="modal__label">
        Name:
        <input
          id="SignUpName"
          type="text"
          name="username"
          value={name}
          onChange={handleNameChange}
          className="modal__input"
          required
        />
      </label>
      <label htmlFor="SignUpEmail" className="modal__label">
        Email:
        <input
          id="SignUpEmail"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="modal__input"
          required
        />
      </label>
      <label htmlFor="SignUpPassword" className="modal__label">
        Password:
        <input
          id="SignUpPassword"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default SignUpModal;
