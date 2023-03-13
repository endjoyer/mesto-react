import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <aside //Не понятно как сделать так, чтобы картинка закрывалась плавно, как и попап, а не исчезала мгновенно
      className={`popup popup-look-img ${card.link ? 'popup_opened' : ''}`}
    >
      <div className="popup__container popup-look-img__container">
        <button
          className="popup__close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup-look-img__image"
          src={card.link}
          alt={card.name}
        />
        <h3 className="popup-look-img__title">{card.name}</h3>
      </div>
    </aside>
  );
}

export default ImagePopup;
