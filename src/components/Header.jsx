import { Link } from "react-router-dom";
import "../blocks/Header.css";
import PageDataContext from "../contexts/PageDataContext.js";
import { useContext } from "react";

const Header = () => {
  const { activeRoute, setActiveRoute, setActiveSubRoute } =
    useContext(PageDataContext);

  const handleHomeClick = () => {
    setActiveRoute("home");
  };

  const handleProjectsClick = () => {
    setActiveRoute("projects");
    setActiveSubRoute("");
  };

  const handleContactMeClick = () => {
    setActiveRoute("contactMe");
  };

  return (
    <header className="header">
      <p className="header__logo">Jensen Bean</p>
      <div className="header__links">
        <Link
          to="/"
          className={`header__link ${
            activeRoute === "home" ? "header__link-focus" : ""
          }`}
          onClick={handleHomeClick}
        >
          <p className="header__link-text">Home</p>
        </Link>
        <Link
          to="/projects"
          className={`header__link ${
            activeRoute === "projects" ? "header__link-focus" : ""
          }`}
          onClick={handleProjectsClick}
        >
          <p className="header__link-text">Projects</p>
        </Link>
        <Link
          to="/contactMe"
          className={`header__link ${
            activeRoute === "contactMe" ? "header__link-focus" : ""
          }`}
          onClick={handleContactMeClick}
        >
          <p className="header__link-text">Contact Me</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
