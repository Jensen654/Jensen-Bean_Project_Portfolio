import "../blocks/ProjectDisplay.css";
import PageDataContext from "../contexts/PageDataContext";
import { useContext } from "react";
import OpenNewTab from "../assets/icons8-new-tab.svg";
import UserDataContext from "../contexts/UserDataContext";
import trashCanPic from "../assets/reshot-icon-trash-ZQRFC2LJXU.svg";
import ProjectDataContext from "../contexts/ProjectDataContext";
import PublicDataContext from "../contexts/PublicDataContext";
import editPic from "../assets/edit.svg";

const ProjectDisplay = ({
  project,
  projectTitle,
  projectDescription,
  projectUrl,
}) => {
  const { buttonPressed, setButtonPressed, setActiveModal } =
    useContext(PageDataContext);
  const { isUserLoggedIn } = useContext(UserDataContext);
  const { setSelectedProject } = useContext(ProjectDataContext);
  const { isOwner } = useContext(PublicDataContext);

  function getYouTubeEmbedUrl(url) {
    if (typeof url !== "string") return null; // <-- Add this line
    // Handles URLs like https://youtu.be/VIDEO_ID and https://www.youtube.com/watch?v=VIDEO_ID
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(project.videoUrl);

  const handleDropDownClick = () => {
    setButtonPressed((prev) => ({
      ...prev,
      [project._id]: !prev[project._id],
    }));
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setActiveModal("edit-project");
    handleProjectDisplayClick();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setActiveModal("are-you-sure");
    handleProjectDisplayClick();
  };

  const handleProjectDisplayClick = () => {
    console.log(project);

    setSelectedProject(project);
  };

  return (
    <section onClick={handleProjectDisplayClick} className="project-display">
      <div className="project-display__intro" onClick={handleDropDownClick}>
        {isUserLoggedIn && isOwner ? (
          <button
            onClick={handleEditClick}
            className="project-display__edit-button"
          >
            <img
              className="project-display__edit-image"
              src={editPic}
              alt="Edit Project"
            />
          </button>
        ) : (
          <></>
        )}
        <h2 className="project-display__title">{projectTitle}</h2>
        <button
          className={`project-display__button ${
            buttonPressed[project._id] ? "project-display__button_pressed" : ""
          }`}
        >
          <svg
            className="project-display__arrow"
            width="40"
            height="40"
            viewBox="-19.04 0 75.804 75.804"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(-831.568 -384.448)">
              <path
                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
        {isUserLoggedIn && isOwner ? (
          <button
            className="project-display__trash-button"
            onClick={handleDeleteClick}
          >
            <img
              className="project-display__trash-image"
              src={trashCanPic}
              alt="Trash Can Picture"
            />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`project-display__details ${
          buttonPressed[project._id] ? "project-display__details_open" : ""
        }`}
      >
        <p className="project-display__description">{projectDescription}</p>
        {projectUrl ? (
          <div className="project-display__url-container">
            <a
              href={projectUrl}
              target="_blank"
              rel="noreferrer"
              className="project-display__link"
            >
              <p>Open In New Tab</p>{" "}
              <img src={OpenNewTab} alt="Open In New Window" />
            </a>
            <iframe
              className="project-display__content"
              src={projectUrl}
            ></iframe>
          </div>
        ) : null}
        {project.image ? (
          <img
            className="project-display__content"
            src={project.image}
            alt={project.title}
          />
        ) : null}
        {/* {project.videoUrl ? (
          <video
            className="project-display__content"
            src={project.videoUrl}
            controls
          />
        ) : null} */}
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="project-display__content"
            allowFullScreen
          />
        ) : null}
      </div>
    </section>
  );
};

export default ProjectDisplay;
