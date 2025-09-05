import "../blocks/ModalWithForm.css";
import { useContext } from "react";
import PageDataContext from "../contexts/PageDataContext.js";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  handleSubmit,
  optionalButtonText,
  optionalButtonTextFunction,
}) {
  const { setActiveModal } = useContext(PageDataContext);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`modal ${isOpen && "modal_opened"}`}
    >
      <div onClick={stopPropagation} className="modal__content">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h3 className="modal__title">{title}</h3>
          <button
            onClick={handleCloseClick}
            className="modal__close-button"
            type="button"
          ></button>
          {children}
          <button className="modal__form_submit" type="submit">
            {buttonText}
          </button>
          {optionalButtonText && (
            <button
              className="modal__form_alternate-button"
              type="button"
              onClick={optionalButtonTextFunction}
            >
              {optionalButtonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
