import "../blocks/Menu.css";
import { useContext } from "react";
import PageDataContext from "../contexts/PageDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";
import AreYouSureModal from "./AreYouSureModal.jsx";

const Menu = ({ handleLogOut, handleDeleteProfile }) => {
  const {
    menuOpen,
    setMenuOpen,
    activeModal,
    setActiveModal,
    setAdditionalAreYouSureText,
  } = useContext(PageDataContext);
  const { isUserLoggedIn, currentUser } = useContext(UserDataContext);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSignUpClick = () => {
    setActiveModal("signUp");
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    setActiveModal("logIn");
    setMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setActiveModal("are-you-sure-delete");
    // setMenuOpen(false);
  };

  return (
    <div
      className={`menu__overlay ${menuOpen ? "menu__overlay_visible" : ""}`}
      onClick={handleCloseMenu}
    >
      <AreYouSureModal
        isOpen={activeModal === "are-you-sure-delete"}
        handleSubmit={handleDeleteProfile}
        additionalText={`This will permanently delete the profile for ${currentUser.userName}. This action cannot be undone.`}
      />
      <div className="menu" onClick={stopPropagation}>
        {!isUserLoggedIn && (
          <>
            <button onClick={handleSignUpClick} className="menu__item">
              Create Your Own Profile!
            </button>
            <button onClick={handleLoginClick} className="menu__item">
              Log In
            </button>
          </>
        )}
        {isUserLoggedIn && (
          <>
            <button onClick={handleLogOut} className="menu__item">
              Log Out
            </button>
            <button
              onClick={handleDeleteClick}
              className="menu__item menu__item_delete"
            >
              Delete Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
