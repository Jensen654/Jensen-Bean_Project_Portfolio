import ModalWithForm from "./ModalWithForm";
import { useContext, useEffect, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import ProjectDataContext from "../contexts/ProjectDataContext";

const EditProfileModal = ({
  handleCloseModal,
  handleUploadProjectImage,
  handleSubmit,
}) => {
  const { activeModal } = useContext(PageDataContext);
  const { currentUser } = useContext(UserDataContext);
  const { projects } = useContext(ProjectDataContext);

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
    if (projects.length >= 30) {
      alert(
        "You have reached the maximum number of projects (30). Please delete an existing project before adding a new one."
      );
      return;
    }

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
    setprojectName("");
    setProjectUrl("");
    setProjectVideo("");
    setProjectDescription("");
    setProjectImage(null);
    setProjectType("");
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
          placeholder="Project Name"
          required
          minLength={2}
          maxLength={100}
        />
      </label>
      <label htmlFor="ProjectUrl" className="modal__label">
        Project URL:
        <input
          id="ProjectUrl"
          type="url"
          name="Project URL"
          value={projectUrl}
          onChange={handleProjectUrlChange}
          className="modal__input"
          placeholder="Project URL"
          //   required
        />
      </label>
      <label htmlFor="ProjectVideo" className="modal__label">
        YouTube Video URL:
        <input
          id="ProjectVideo"
          type="url"
          name="ProjectVideo"
          value={projectVideo}
          onChange={handleProjectVideoChange}
          className="modal__input"
          placeholder="Youtube URL"
          //   required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Project Type:</legend>
        <label htmlFor="tech" className="modal__label_type_radio">
          Tech
          <input
            checked={projectType === "tech"}
            id="tech"
            type="radio"
            name="projectType"
            onChange={handleProjectTypeChange}
            className="modal__input"
            required
          />
        </label>
        <label htmlFor="performance" className="modal__label_type_radio">
          Performance
          <input
            checked={projectType === "performance"}
            id="performance"
            type="radio"
            name="projectType"
            onChange={handleProjectTypeChange}
            className="modal__input"
            required
          />
        </label>
        <label htmlFor="other" className="modal__label_type_radio">
          Other
          <input
            checked={projectType === "other"}
            id="other"
            type="radio"
            name="projectType"
            onChange={handleProjectTypeChange}
            className="modal__input"
            required
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
          placeholder="Project Description"
          required
          minLength={2}
          maxLength={1000}
          // placeholder="Optional"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
