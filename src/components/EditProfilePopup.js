import React from 'react';
import Popup from './Popup';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} name="edit">
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        btnText="Сохранить"
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            name="name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={(e) => setName(e.target.value)}
            value={name || ''}
          />
          <span className="name-error popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            name="about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            onChange={(e) => setDescription(e.target.value)}
            value={description || ''}
          />
          <span className="about-error popup__input-error"></span>
        </label>
      </PopupWithForm>
    </Popup>
  );
}

export default EditProfilePopup;
