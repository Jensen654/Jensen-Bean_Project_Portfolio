import { Link } from "react-router-dom";
import "../blocks/Header.css";
import PageDataContext from "../contexts/PageDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import { useContext } from "react";

const Header = () => {
  const { activeRoute, setActiveRoute, setActiveSubRoute, setActiveModal } =
    useContext(PageDataContext);
  const { currentUser } = useContext(UserDataContext);

  const handleHomeClick = () => {
    setActiveRoute("home");
  };

  const handleProjectsClick = () => {
    setActiveRoute("projects");
    setActiveSubRoute("web-applications");
  };

  const handleContactMeClick = () => {
    setActiveRoute("contactMe");
  };

  const handleSignUpClick = () => {
    setActiveModal("signUp");
  };

  return (
    <header className="header">
      <p className="header__logo">{currentUser.name || "Jensen Bean"}</p>
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
          to="/projects/web-applications"
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
        <button
          className={`header__link header__signup-button`}
          onClick={handleSignUpClick}
        >
          Make Your Own Account!
        </button>
      </div>
    </header>
  );
};

export default Header;
