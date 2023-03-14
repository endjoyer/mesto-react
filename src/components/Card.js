import React from 'react';

function Card(card) {
  function handleCardClick() {
    card.onCardClick(card);
  }

  return (
    <>
      <div className="element__image-container">
        <img
          className="element__image"
          onClick={handleCardClick}
          alt={card.name}
          src={card.link}
        />
      </div>
      <button
        className="element__delete"
        aria-label="Закрыть"
        type="button"
      ></button>
      <div className="element__panel">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className="element__like"
            aria-label="Поставить лайк"
            type="button"
          ></button>
          <span className="element__number-likes">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
