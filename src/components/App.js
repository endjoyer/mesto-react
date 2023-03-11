import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={setEditAvatarPopupOpen}
          onEditProfile={setEditProfilePopupOpen}
          onAddPlace={setAddPlacePopupOpen}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
        >
          {' '}
          <label className="popup__label">
            <input
              className="popup__input"
              type="text"
              name="name"
              placeholder="Имя"
              // value=""
              required
              minLength="2"
              maxLength="40"
            />
            <span className="name-error popup__input-error"></span>
          </label>
          <label className="popup__label">
            <input
              className="popup__input"
              type="text"
              name="about"
              placeholder="О себе"
              // value=""
              required
              minLength="2"
              maxLength="200"
            />
            <span className="about-error popup__input-error"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
        >
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
        </PopupWithForm>
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
        >
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
        </PopupWithForm>
        <PopupWithForm name="confirmation" title="Вы уверены?" />
        <PopupWithImage />
      </div>

      <template id="element-template">
        <li className="element">
          <div className="element__image-container">
            <img className="element__image" />
          </div>
          <button
            className="element__delete"
            aria-label="Закрыть"
            type="button"
          ></button>
          <div className="element__panel">
            <h2 className="element__name"></h2>
            <div className="element__like-container">
              <button
                className="element__like"
                aria-label="Поставить лайк"
                type="button"
              ></button>
              <span className="element__number-likes"></span>
            </div>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
