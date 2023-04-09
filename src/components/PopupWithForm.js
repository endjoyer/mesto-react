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
      <form
        className={`popup__container ${
          name === 'auth' ? 'popup__container_auth' : ''
        }`}
        name="form-popup"
        onSubmit={onSubmit}
        noValidate
      >
        <h3
          className={`popup__title ${
            name === 'auth' ? 'popup__title_auth' : ''
          }`}
        >
          {title}
        </h3>
        <button
          className={` ${
            name === 'auth' ? 'popup__close_auth' : 'popup__close'
          }`}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        {children}
        <button
          className={`popup__btn ${name === 'auth' ? 'popup__btn_auth' : ''}`}
          type="submit"
        >
          <span
            className={`popup__btn-text ${
              isLoading ? 'popup__btn-text_loading' : ''
            }`}
          >
            {btnText}
          </span>
        </button>
      </form>
    </>
  );
}

export default PopupWithForm;
