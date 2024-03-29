import React from 'react';
import Popup from './Popup';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        name="add"
        title="Новое место"
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
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleChangeName}
          />
          <span className="name-error popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            value={link}
            onChange={handleChangeLink}
            required
          />
          <span className="link-error popup__input-error"></span>
        </label>
      </PopupWithForm>
    </Popup>
  );
}

export default EditProfilePopup;
