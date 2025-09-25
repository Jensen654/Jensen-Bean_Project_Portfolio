import ModalWithForm from "./ModalWithForm";
import { useContext, useEffect, useState } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import ProjectDataContext from "../contexts/ProjectDataContext";

const EditProjectModal = ({
  handleCloseModal,
  handleUploadProjectImage,
  handleUpdateProject,
  handleDeletePhoto,
}) => {
  const { activeModal, loading } = useContext(PageDataContext);
  const { currentUser } = useContext(UserDataContext);
  const { selectedProject } = useContext(ProjectDataContext);

  const [projectName, setprojectName] = useState(selectedProject.title ?? "");
  const [projectUrl, setProjectUrl] = useState(selectedProject.url ?? "");
  const [projectVideo, setProjectVideo] = useState(
    selectedProject.videoUrl ?? ""
  );
  const [projectDescription, setProjectDescription] = useState(
    selectedProject.description ?? ""
  );
  const [projectImage, setProjectImage] = useState(null);
  const [projectType, setProjectType] = useState(selectedProject.type ?? "");

  useEffect(() => {
    setprojectName(selectedProject?.title ?? "");
    setProjectUrl(selectedProject?.url ?? "");
    setProjectVideo(selectedProject?.videoUrl ?? "");
    setProjectDescription(selectedProject?.description ?? "");
    setProjectType(selectedProject?.type ?? "");
  }, [selectedProject]);

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

    if (projectImage && selectedProject.image.length > 0) {
      await handleDeletePhoto(selectedProject.image).catch((err) =>
        console.error(err)
      );
      await handleUploadProjectImage(projectImage)
        .then((data) => {
          returnImageUrl = data;
        })
        .catch((err) => console.error(err));
    } else if (projectImage) {
      await handleUploadProjectImage(projectImage)
        .then((data) => {
          returnImageUrl = data;
        })
        .catch((err) => console.error(err));
    }

    handleUpdateProject({
      _id: selectedProject._id,
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
      title="Update Project"
      buttonText={loading ? "Updating..." : "Update Project"}
      isOpen={activeModal === "edit-project"}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmitForm}
    >
      <label htmlFor="EditProjectName" className="modal__label">
        Project Name:
        <input
          id="EditProjectName"
          type="text"
          name="EditProjectName"
          value={projectName}
          onChange={handleProjectNameChange}
          className="modal__input"
          required
          minLength={2}
          maxLength={100}
        />
      </label>
      <label htmlFor="EditProjectUrl" className="modal__label">
        Project URL:
        <input
          id="EditProjectUrl"
          type="url"
          name="EditProjectURL"
          value={projectUrl}
          onChange={handleProjectUrlChange}
          className="modal__input"
          placeholder="Optional"
          //   required
        />
      </label>
      <label htmlFor="EditProjectVideo" className="modal__label">
        YouTube Video URL:
        <input
          id="EditProjectVideo"
          type="url"
          name="EditProjectVideo"
          value={projectVideo}
          onChange={handleProjectVideoChange}
          className="modal__input"
          placeholder="Optional"
          //   required
        />
      </label>
      <fieldset className="modal__radio-buttons" required>
        <legend className="modal__legend">Select the Project Type:</legend>
        <label htmlFor="editTech" className="modal__label_type_radio">
          Tech
          <input
            checked={projectType === "tech"}
            id="editTech"
            type="radio"
            name="editProjectType"
            onChange={handleProjectTypeChange}
            className="modal__input"
            // required
          />
        </label>
        <label htmlFor="EditPerformance" className="modal__label_type_radio">
          Performance
          <input
            checked={projectType === "performance"}
            id="EditPerformance"
            type="radio"
            name="editProjectType"
            onChange={handleProjectTypeChange}
            className="modal__input"
            // required
          />
        </label>
        <label htmlFor="EditOther" className="modal__label_type_radio">
          Other
          <input
            checked={projectType === "other"}
            id="EditOther"
            type="radio"
            name="editProjectType"
            onChange={handleProjectTypeChange}
            className="modal__input"
            // required
          />
        </label>
      </fieldset>
      <label htmlFor="EditProjectPicture" className="modal__label">
        Project Picture:
        <input
          id="EditProjectPicture"
          type="file"
          name="EditProjectPicture"
          //   value={profession}
          onChange={handleProjectImageChange}
          className="modal__input modal__input_type_file"
          //   required
          placeholder="Optional"
        />
      </label>
      <label htmlFor="EditProjectDescription" className="modal__label">
        Project Description:
        <textarea
          id="EditProjectDescription"
          type="text"
          name="about"
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
          className="modal__input"
          required
          minLength={2}
          maxLength={1000}
          // placeholder="Optional"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProjectModal;
