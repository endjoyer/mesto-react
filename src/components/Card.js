import React from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;

  function handleCardClick() {
    card.onCardClick(card);
  }
  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card);
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
      {isOwn && (
        <button
          className="element__delete"
          aria-label="Закрыть"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__panel">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like ${isLiked ? 'element__like_active' : ''}`}
            onClick={handleLikeClick}
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
