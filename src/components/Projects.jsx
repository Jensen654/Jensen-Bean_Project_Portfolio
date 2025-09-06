import { Link, Outlet } from "react-router-dom";
import "../blocks/Projects.css";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";
import { useContext } from "react";

const Projects = () => {
  const { activeSubRoute, setActiveSubRoute, setActiveModal } =
    useContext(PageDataContext);
  const { isUserLoggedIn } = useContext(UserDataContext);

  const handleAddProjectClick = () => {
    setActiveModal("add-project");
  };

  const clickWebApps = () => {
    setActiveSubRoute("web-applications");
  };
  const clickOtherProjects = () => {
    setActiveSubRoute("other-projects");
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
        <Link
          onClick={clickWebApps}
          className={`project__nav-link ${
            activeSubRoute === "web-applications"
              ? "project__nav-link-focus"
              : ""
          }`}
          to="/projects/web-applications"
        >
          Web Applications
        </Link>
        <Link
          onClick={clickOtherProjects}
          className={`project__nav-link ${
            activeSubRoute === "other-projects" ? "project__nav-link-focus" : ""
          }`}
          to="/projects/other-projects"
        >
          Other Projects
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Projects;
