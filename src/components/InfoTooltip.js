import React from 'react';
import Popup from './Popup';
import PopupWithForm from './PopupWithForm';

function InfoTooltip({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        btnText="Сохранить"
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            onChange={handleChangeAvatar}
            ref={avatarRef}
            required
          />
          <span className="avatar-error popup__input-error"></span>
        </label>
      </PopupWithForm>
    </Popup>
  );
}

export default InfoTooltip;
