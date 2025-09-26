import { Link } from "react-router-dom";
import "../blocks/Header.css";
import PageDataContext from "../contexts/PageDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import { useContext } from "react";
import MenuSvg from "../assets/menu-icon.svg";
import PublicDataContext from "../contexts/PublicDataContext.js";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const {
    activeRoute,
    setActiveRoute,
    activeSubRoute,
    setMenuOpen,
    setActiveModal,
  } = useContext(PageDataContext);
  const { currentUser, showContactMeInfo, isUserLoggedIn } =
    useContext(UserDataContext);
  const { publicUserName, publicUser } = useContext(PublicDataContext);

  const handleHomeClick = () => {
    setActiveRoute("home");
  };

  const handleProjectsClick = () => {
    setActiveRoute("projects");
  };

  const handleContactMeClick = () => {
    setActiveRoute("contactMe");
  };

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const handleSignUpClick = () => {
    setActiveModal("signUp");
  };

  return (
    <header className="header">
      {isUserLoggedIn ? (
        <Link
          to={`${currentUser.userName}/`}
          className={`header__username header__link ${
            location.pathname.includes(currentUser.userName)
              ? "header__link-focus"
              : ""
          }`}
          onClick={handleHomeClick}
        >
          <p className="header__logo">
            {typeof currentUser.name === "string" && currentUser.name.length > 0
              ? currentUser.name
              : "Your Page"}
          </p>
        </Link>
      ) : (
        <button onClick={handleSignUpClick}>Create A Profile!</button>
      )}

      <div className="header__links">
        <Link
          to={`${publicUserName}/`}
          className={`header__link ${
            activeRoute === "home" ? "header__link-focus" : ""
          }`}
          onClick={handleHomeClick}
        >
          <p className="header__link-text">Home</p>
        </Link>
        <Link
          to={`${publicUserName}/projects/${activeSubRoute}`}
          className={`header__link ${
            activeRoute === "projects" ? "header__link-focus" : ""
          }`}
          onClick={handleProjectsClick}
        >
          <p className="header__link-text">Projects</p>
        </Link>
        {showContactMeInfo && (
          <Link
            to={`${publicUserName}/contactMe`}
            className={`header__link ${
              activeRoute === "contactMe" ? "header__link-focus" : ""
            }`}
            onClick={handleContactMeClick}
          >
            <p className="header__link-text">Contact Me</p>
          </Link>
        )}
        {/* {!isUserLoggedIn && (
          <Link
            to={`${publicUserName}/contactMe`}
            className={`header__link ${
              activeRoute === "contactMe" ? "header__link-focus" : ""
            }`}
            onClick={handleContactMeClick}
          >
            <p className="header__link-text">Contact Me</p>
          </Link>
        )} */}
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
