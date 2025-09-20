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

  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [name, setName] = useState(currentUser?.name ?? "");
  const [profession, setProfession] = useState(currentUser?.profession ?? "");
  const [resume, setResume] = useState(currentUser?.resume ?? "");
  const [about, setAbout] = useState(currentUser?.about ?? "");
  const [avatar, setAvatar] = useState(null);
  const [phone, setPhone] = useState(currentUser?.phoneNumber ?? "");
  const [showContactMe, setShowContactMe] = useState(
    currentUser?.showContactMe ?? false
  );

  // useEffect(() => {
  //   setEmail(currentUser.email);
  //   setName(currentUser.name);
  //   setProfession(currentUser.profession);
  //   setResume(currentUser.resume);
  //   setAbout(currentUser.about);
  //   setPhone(currentUser.phoneNumber);
  //   setShowContactMe(currentUser.showContactMe);
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email ?? "");
      setName(currentUser.name ?? "");
      setProfession(currentUser.profession ?? "");
      setResume(currentUser.resume ?? "");
      setAbout(currentUser.about ?? "");
      setPhone(currentUser.phoneNumber ?? "");
      setShowContactMe(currentUser.showContactMe ?? false);
    }
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

  const handlePhoneNumberChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCheckBoxClick = (e) => {
    setShowContactMe(!showContactMe);
    console.log(showContactMe);
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
    console.log(phone);

    handleSubmit({
      name,
      email,
      phoneNumber: phone,
      profession,
      resume,
      about,
      showContactMe,
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
      <label htmlFor="phone" className="modal__label">
        Phone Number:
        <input
          id="phone"
          type="text"
          name="phone"
          value={phone}
          onChange={handlePhoneNumberChange}
          className="modal__input"
          //   required
        />
      </label>
      <label htmlFor="ShowContactMe" className="modal__label">
        Show Contact Info?
        <input
          checked={showContactMe}
          id="ShowContactMe"
          type="checkbox"
          name="ShowContactMe"
          // value={isChecked}
          // onClick={handleCheckBoxClick}
          onChange={handleCheckBoxClick}
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
