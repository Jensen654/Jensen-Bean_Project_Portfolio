import { Link, Outlet } from "react-router-dom";
import "../blocks/Projects.css";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import ProjectDataContext from "../contexts/ProjectDataContext";
import PublicDataContext from "../contexts/PublicDataContext";
import { useContext, useEffect } from "react";
import { DefaultProjects } from "../utils/constants";
import AreYouSureModal from "./AreYouSureModal";
import { useParams } from "react-router-dom";

const Projects = () => {
  const { activeSubRoute, setActiveSubRoute, activeModal, setActiveModal } =
    useContext(PageDataContext);
  const { isUserLoggedIn } = useContext(UserDataContext);
  const { projects, selectedProject, handleDeleteProject } =
    useContext(ProjectDataContext);
  const { isOwner, setPublicUserName, publicUserName } =
    useContext(PublicDataContext);
  const { userName } = useParams();

  useEffect(() => {
    setPublicUserName(userName);
  }, [userName]);

  const handleAddProjectClick = () => {
    setActiveModal("add-project");
  };

  const clickWebApps = () => {
    setActiveSubRoute("tech-projects");
  };
  const clickOtherProjects = () => {
    setActiveSubRoute("other-projects");
  };
  const clickPerformanceProjects = () => {
    setActiveSubRoute("performance-projects");
  };

  const submitDeleteProject = () => {
    handleDeleteProject({
      projectId: selectedProject._id,
      pictureUrl: selectedProject.image,
    });
  };

  return (
    <div className="projects">
      <AreYouSureModal
        isOpen={activeModal === "are-you-sure"}
        handleSubmit={submitDeleteProject}
      />
      {isUserLoggedIn && isOwner ? (
        <button
          className="home__edit-profile-button"
          onClick={handleAddProjectClick}
        >
          Add Project
        </button>
      ) : (
        ""
      )}
      <nav className="project__nav">
        {projects.length > 0
          ? projects.find((p) => p.type === "tech") && (
              <Link
                onClick={clickWebApps}
                className={`project__nav-link ${
                  activeSubRoute === "tech-projects"
                    ? "project__nav-link-focus"
                    : ""
                }`}
                to={`/${publicUserName}/projects/tech-projects`}
              >
                Technology
              </Link>
            )
          : DefaultProjects.find((p) => p.type === "tech") && (
              <Link
                onClick={clickWebApps}
                className={`project__nav-link ${
                  activeSubRoute === "tech-projects"
                    ? "project__nav-link-focus"
                    : ""
                }`}
                to={`/${publicUserName}/projects/tech-projects`}
              >
                Technology
              </Link>
            )}
        {projects.length > 0
          ? projects.find((p) => p.type === "performance") && (
              <Link
                onClick={clickPerformanceProjects}
                className={`project__nav-link ${
                  activeSubRoute === "performance-projects"
                    ? "project__nav-link-focus"
                    : ""
                }`}
                to={`/${publicUserName}/projects/performance-projects`}
              >
                Performance
              </Link>
            )
          : DefaultProjects.find((p) => p.type === "performance") && (
              <Link
                onClick={clickPerformanceProjects}
                className={`project__nav-link ${
                  activeSubRoute === "performance-projects"
                    ? "project__nav-link-focus"
                    : ""
                }`}
                to={`/${publicUserName}/projects/performance-projects`}
              >
                Performance
              </Link>
            )}
        {projects.length > 0
          ? projects.find((p) => p.type === "other") && (
              <Link
                onClick={clickOtherProjects}
                className={`project__nav-link ${
                  activeSubRoute === "other-projects"
                    ? "project__nav-link-focus"
                    : ""
                }`}
                to={`/${publicUserName}/projects/other-projects`}
              >
                Other
              </Link>
            )
          : DefaultProjects.find((p) => p.type === "other") && (
              <Link
                onClick={clickOtherProjects}
                className={`project__nav-link ${
                  activeSubRoute === "other-projects"
                    ? "project__nav-link-focus"
                    : ""
                }`}
                to={`/${publicUserName}/projects/other-projects`}
              >
                Other
              </Link>
            )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Projects;
