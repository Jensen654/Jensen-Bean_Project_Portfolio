import ModalWithForm from "./ModalWithForm";
import { useContext, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";

const LoginModal = ({ handleCloseModal, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { activeModal } = useContext(PageDataContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={activeModal === "logIn"}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmitForm}
    >
      <label htmlFor="LoginEmail" className="modal__label">
        Email:
        <input
          id="LoginEmail"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="modal__input"
          placeholder="Enter your email"
          required
        />
      </label>
      <label htmlFor="LoginPassword" className="modal__label">
        Password:
        <input
          id="LoginPassword"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="modal__input"
          placeholder="Enter your password"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
