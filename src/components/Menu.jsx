import "../blocks/Menu.css";
import { useContext } from "react";
import PageDataContext from "../contexts/PageDataContext.js";
import UserDataContext from "../contexts/UserDataContext.js";

const Menu = ({ handleLogOut }) => {
  const { menuOpen, setMenuOpen, setActiveModal } = useContext(PageDataContext);
  const { isUserLoggedIn } = useContext(UserDataContext);

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

  return (
    <div
      className={`menu__overlay ${menuOpen ? "menu__overlay_visible" : ""}`}
      onClick={handleCloseMenu}
    >
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
            <button className="menu__item menu__item_delete">
              Delete Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
