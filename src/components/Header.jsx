import { Link } from "react-router-dom";
import "../blocks/Header.css";
import PageDataContext from "../contexts/PageDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import { useContext } from "react";
import MenuSvg from "../assets/menu-icon.svg";

const Header = () => {
  const { activeRoute, setActiveRoute, setActiveSubRoute, setMenuOpen } =
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

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  return (
    <header className="header">
      <p className="header__logo">
        {typeof currentUser.name === "string" && currentUser.name.length > 0
          ? currentUser.name
          : "Your Name Here"}
      </p>
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
          onClick={handleMenuClick}
        >
          <img src={MenuSvg} alt="Menu" className="header__menu-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
