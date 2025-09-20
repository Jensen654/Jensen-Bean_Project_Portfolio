import "../blocks/ModalWithForm.css";
import { useContext } from "react";
import ProjectDataContext from "../contexts/ProjectDataContext";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";

const AreYouSureModal = ({ isOpen, handleSubmit }) => {
  const { handleDeleteProject, selectedProject } =
    useContext(ProjectDataContext);
  const { currentUser } = useContext(UserDataContext);
  const { handleCloseModal } = useContext(PageDataContext);

  const handleCloseModalNow = () => {
    handleCloseModal();
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    // handleDeleteProject({
    //   projectId: selectedProject._id,
    //   picturnUrl: selectedProject.avatar,
    // });
    handleSubmit(currentUser.id);
  };

  return (
    <div
      onClick={handleCloseModalNow}
      className={`modal ${isOpen && "modal_opened"}`}
    >
      <div
        onClick={handleStopPropagation}
        className="modal__content modal__delete-content"
      >
        <button
          onClick={handleCloseModalNow}
          className="modal__close-button"
          type="button"
        ></button>
        <h2 className="modal__title">Are You Sure?</h2>
        <div className="modal__delete-container">
          <button onClick={handleDeleteClick} className="modal__form_submit">
            Yes
          </button>
          <button onClick={handleCloseModalNow} className="modal__form_submit">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSureModal;
