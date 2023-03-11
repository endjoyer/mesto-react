import React from 'react';

function PopupWithImage() {
  return (
    <aside className="popup popup-look-img">
      <div className="popup__container popup-look-img__container">
        <button
          className="popup__close"
          aria-label="Закрыть"
          type="button"
        ></button>
        <img className="popup-look-img__image" src="#" alt="" />
        <h3 className="popup-look-img__title"></h3>
      </div>
    </aside>
  );
}

export default PopupWithImage;
