import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, []);

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={setEditAvatarPopupOpen}
          onEditProfile={setEditProfilePopupOpen}
          onAddPlace={setAddPlacePopupOpen}
          onCardClick={setSelectedCard}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
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
          onClose={closeAllPopups}
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
          onClose={closeAllPopups}
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
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </>
  );
}

export default App;
