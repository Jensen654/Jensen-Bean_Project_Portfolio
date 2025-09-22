import ModalWithForm from "./ModalWithForm";
import { useContext, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";

const SignUpModal = ({ handleCloseModal, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({ name, userName, email, password });
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
          name="name"
          value={name}
          onChange={handleNameChange}
          className="modal__input"
          placeholder="Name"
          required
          minLength={2}
          maxLength={20}
        />
      </label>
      <label htmlFor="UserName" className="modal__label">
        Username:
        <input
          id="UserName"
          type="text"
          name="UserName"
          value={userName}
          onChange={handleUserNameChange}
          className="modal__input"
          placeholder="Enter a Unique Username"
          required
          minLength={2}
          maxLength={30}
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
          placeholder="Email"
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
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default SignUpModal;
