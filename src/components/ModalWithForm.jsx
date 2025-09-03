import "../blocks/ModalWithForm.css";

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
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
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
