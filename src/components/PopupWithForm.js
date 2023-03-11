import React, { Children } from 'react';

function PopupWithForm({ name, title, isOpen }) {
  return (
    <>
      <aside
        className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
        id="popup-edit"
      >
        <form className="popup__container" name="form-popup" noValidate>
          <h3 className="popup__title">{title}</h3>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
          ></button>
          {children}
          <button className="popup__btn popup__submit" type="submit">
            <span className="popup__btn-text">Сохранить</span>
          </button>
        </form>
      </aside>

      <aside
        className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
        id="popup-add"
      >
        <form
          className="popup__container popup__container_type_add"
          name="form-popup"
          noValidate
        >
          <h3 className="popup__title">{title}</h3>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
          ></button>
          <label className="popup__label">
            <input
              className="popup__input"
              type="text"
              name="name"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="name-error popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input
              className="popup__input"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="link-error popup__input-error"></span>
          </label>
          <button className="popup__btn popup__submit" type="submit">
            <span className="popup__btn-text">Сохранить</span>
          </button>
        </form>
      </aside>

      <aside
        className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
        id="popup-edit-avatar"
      >
        <form className="popup__container" name="form-popup" noValidate>
          <h3 className="popup__title">{title}</h3>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
          ></button>
          <label className="popup__label">
            <input
              className="popup__input"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="avatar-error popup__input-error"></span>
          </label>
          <button className="popup__btn popup__submit" type="submit">
            <span className="popup__btn-text">Сохранить</span>
          </button>
        </form>
      </aside>

      <aside className={`popup popup_type_${name}`} id="popup-confirmation">
        <form className="popup__container">
          <h3 className="popup__title">{title}</h3>
          <button
            className="popup__close"
            aria-label="Закрыть"
            type="button"
          ></button>
          <button className="popup__btn" type="submit">
            Да
          </button>
        </form>
      </aside>
    </>
  );
}

export default PopupWithForm;
