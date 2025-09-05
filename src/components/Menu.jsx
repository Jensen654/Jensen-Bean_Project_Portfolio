import "../blocks/Menu.css";
import { useContext } from "react";
import PageDataContext from "../contexts/PageDataContext.js";

const Menu = () => {
  const { menuOpen, setMenuOpen, setActiveModal } = useContext(PageDataContext);

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
        <button onClick={handleSignUpClick} className="menu__item">
          Create Your Own Profile!
        </button>
        <button onClick={handleLoginClick} className="menu__item">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Menu;
