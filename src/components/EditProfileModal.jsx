import ModalWithForm from "./ModalWithForm";
import { useContext, useEffect, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";

const EditProfileModal = ({
  handleCloseModal,
  handleSubmit,
  handleUploadAvatar,
}) => {
  const { activeModal } = useContext(PageDataContext);
  const { currentUser } = useContext(UserDataContext);

  const [email, setEmail] = useState(currentUser.email);
  //   const [password, setPassword] = useState(currentUser.password);
  const [name, setName] = useState(currentUser.name);
  const [profession, setProfession] = useState(currentUser.profession);
  const [resume, setResume] = useState(currentUser.resume);
  const [about, setAbout] = useState(currentUser.about);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    setEmail(currentUser.email);
    setName(currentUser.name);
    setProfession(currentUser.profession);
    setResume(currentUser.resume);
    setAbout(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (avatar) {
      handleUploadAvatar(avatar).then((data) => {
        handleSubmit({
          avatar: data,
        });
      });
    }

    handleSubmit({
      name,
      email,
      profession,
      resume,
      about,
    });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
      isOpen={activeModal === "editProfile"}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmitForm}
    >
      <label htmlFor="EditName" className="modal__label">
        Name:
        <input
          id="EditName"
          type="text"
          name="username"
          value={name}
          onChange={handleNameChange}
          className="modal__input"
          required
        />
      </label>
      {/* <label htmlFor="EditEmail" className="modal__label">
        Email:
        <input
          id="EditEmail"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="modal__input"
          required
        />
      </label> */}
      <label htmlFor="EditProfession" className="modal__label">
        Profession:
        <input
          id="EditProfession"
          type="text"
          name="profession"
          value={profession}
          onChange={handleProfessionChange}
          className="modal__input"
          //   required
        />
      </label>
      <label htmlFor="EditResume" className="modal__label">
        Resume:
        <input
          id="EditResume"
          type="text"
          name="resume"
          value={resume}
          onChange={handleResumeChange}
          className="modal__input"
          //   required
        />
      </label>
      <label htmlFor="EditAvatar" className="modal__label">
        Profile Picture:
        <input
          id="EditAvatar"
          type="file"
          name="EditAvatar"
          //   value={resume}
          onChange={handleAvatarChange}
          className="modal__input modal__input_type_file"
          //   required
        />
      </label>
      <label htmlFor="EditAbout" className="modal__label">
        About:
        <textarea
          id="EditAbout"
          type="text"
          name="about"
          value={about}
          onChange={handleAboutChange}
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
