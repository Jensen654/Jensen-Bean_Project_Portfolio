import ModalWithForm from "./ModalWithForm";
import { useContext, useEffect, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";

const EditProfileModal = ({
  handleCloseModal,
  handleUploadProjectImage,
  handleSubmit,
}) => {
  const { activeModal } = useContext(PageDataContext);
  const { currentUser } = useContext(UserDataContext);

  const [projectName, setprojectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [projectVideo, setProjectVideo] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [projectType, setProjectType] = useState("");

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

  const handleProjectImageChange = (e) => {
    setProjectImage(e.target.files[0]);
  };

  const handleProjectTypeChange = (e) => {
    setProjectType(e.target.id);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let returnImageUrl;

    if (projectImage) {
      await handleUploadProjectImage(projectImage).then((data) => {
        returnImageUrl = data;
      });
    }

    handleSubmit({
      type: projectType,
      title: projectName,
      description: projectDescription,
      url: projectUrl,
      videoUrl: projectVideo,
      image: returnImageUrl,
    });
  };

  return (
    <ModalWithForm
      title="Add Project"
      buttonText="Add Project"
      isOpen={activeModal === "add-project"}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmitForm}
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
          placeholder="Optional"
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
          placeholder="Optional"
          //   required
        />
      </label>
      <fieldset className="modal__radio-buttons" required>
        <legend className="modal__legend">Select the Project Type:</legend>
        <label htmlFor="tech" className="modal__label_type_radio">
          Tech
          <input
            checked={projectType === "tech"}
            id="tech"
            type="radio"
            name="Tech"
            onChange={handleProjectTypeChange}
            className="modal__input"
            // required
          />
        </label>
        <label htmlFor="performance" className="modal__label_type_radio">
          Performance
          <input
            checked={projectType === "performance"}
            id="performance"
            type="radio"
            name="Performance"
            onChange={handleProjectTypeChange}
            className="modal__input"
            // required
          />
        </label>
        <label htmlFor="other" className="modal__label_type_radio">
          Other
          <input
            checked={projectType === "other"}
            id="other"
            type="radio"
            name="Other"
            onChange={handleProjectTypeChange}
            className="modal__input"
            // required
          />
        </label>
      </fieldset>
      <label htmlFor="ProjectPicture" className="modal__label">
        Project Picture:
        <input
          id="ProjectPicture"
          type="file"
          name="ProjectPicture"
          //   value={profession}
          onChange={handleProjectImageChange}
          className="modal__input modal__input_type_file"
          //   required
          placeholder="Optional"
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
          required
          // placeholder="Optional"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
