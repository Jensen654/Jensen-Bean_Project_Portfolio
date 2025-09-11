import { Link, Outlet } from "react-router-dom";
import "../blocks/Projects.css";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import ProjectDataContext from "../contexts/ProjectDataContext";
import { useContext } from "react";

const Projects = () => {
  const { activeSubRoute, setActiveSubRoute, setActiveModal } =
    useContext(PageDataContext);
  const { isUserLoggedIn } = useContext(UserDataContext);
  const { projects } = useContext(ProjectDataContext);

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

  return (
    <div className="projects">
      {isUserLoggedIn && (
        <button
          className="home__edit-profile-button"
          onClick={handleAddProjectClick}
        >
          Add Project
        </button>
      )}
      <nav className="project__nav">
        {projects.find((p) => p.type === "tech") && (
          <Link
            onClick={clickWebApps}
            className={`project__nav-link ${
              activeSubRoute === "tech-projects"
                ? "project__nav-link-focus"
                : ""
            }`}
            to="/projects/tech-projects"
          >
            Tech
          </Link>
        )}
        {projects.find((p) => p.type === "performance") && (
          <Link
            onClick={clickPerformanceProjects}
            className={`project__nav-link ${
              activeSubRoute === "performance-projects"
                ? "project__nav-link-focus"
                : ""
            }`}
            to="/projects/performance-projects"
          >
            Performance
          </Link>
        )}
        {projects.find((p) => p.type === "other") && (
          <Link
            onClick={clickOtherProjects}
            className={`project__nav-link ${
              activeSubRoute === "other-projects"
                ? "project__nav-link-focus"
                : ""
            }`}
            to="/projects/other-projects"
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
