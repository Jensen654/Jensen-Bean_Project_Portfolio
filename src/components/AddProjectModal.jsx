import ModalWithForm from "./ModalWithForm";
import { useContext, useEffect, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";

const EditProfileModal = ({ handleCloseModal, handleSubmit }) => {
  const { activeModal } = useContext(PageDataContext);
  const { currentUser } = useContext(UserDataContext);

  const [projectName, setprojectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectVideo, setProjectVideo] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleProjectNameChange = (e) => {
    setprojectName(e.target.value);
  };

  const handleProjectUrlChange = (e) => {
    setProjectUrl(e.target.value);
  };

  const handleProjectVideoChange = (e) => {
    setProjectVideo(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
      isOpen={activeModal === "add-project"}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="ProjectName" className="modal__label">
        Project Name:
        <input
          id="ProjectName"
          type="text"
          name="ProjectName"
          value={projectName}
          onChange={handleProjectNameChange}
          className="modal__input"
          required
        />
      </label>
      <label htmlFor="ProjectUrl" className="modal__label">
        Project URL:
        <input
          id="ProjectUrl"
          type="text"
          name="Project URL"
          value={projectUrl}
          onChange={handleProjectUrlChange}
          className="modal__input"
          //   required
        />
      </label>
      <label htmlFor="ProjectVideo" className="modal__label">
        YouTube Video URL:
        <input
          id="ProjectVideo"
          type="text"
          name="ProjectVideo"
          value={projectVideo}
          onChange={handleProjectVideoChange}
          className="modal__input"
          //   required
        />
      </label>
      <label htmlFor="ProjectDescription" className="modal__label">
        Project Description:
        <textarea
          id="ProjectDescription"
          type="text"
          name="about"
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
          className="modal__input"
          //   required
        />
      </label>
      <label htmlFor="ProjectPicture" className="modal__label">
        Project Picture:
        <input
          id="ProjectPicture"
          type="file"
          name="ProjectPicture"
          //   value={profession}
          //   onChange={handleProfessionChange}
          className="modal__input modal__input_type_file"
          //   required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
