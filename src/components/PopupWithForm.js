import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <aside
        className={`popup popup_type_${props.name} ${
          props.isOpen ? 'popup_opened' : ''
        }`}
        id="popup-edit"
      >
        <form className="popup__container" name="form-popup" noValidate>
          <h3 className="popup__title">{props.title}</h3>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
          ></button>
          {props.children}
          <button className="popup__btn popup__submit" type="submit">
            <span className="popup__btn-text">Сохранить</span>
          </button>
        </form>
      </aside>
    </>
  );
}

export default PopupWithForm;
