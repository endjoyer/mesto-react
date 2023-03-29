function PopupWithForm({
  name,
  isOpen,
  title,
  onSubmit,
  onClose,
  children,
  isLoading,
  btnText,
}) {
  return (
    <>
      <aside
        className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
        id="popup-edit"
      >
        <form
          className="popup__container"
          name="form-popup"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="popup__title">{title}</h3>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
            onClick={onClose}
          ></button>
          {children}
          <button className="popup__btn popup__submit" type="submit">
            <span
              className={`popup__btn-text ${
                isLoading ? 'popup__btn-text_loading' : ''
              }`}
            >
              {btnText}
            </span>
          </button>
        </form>
      </aside>
    </>
  );
}

export default PopupWithForm;
