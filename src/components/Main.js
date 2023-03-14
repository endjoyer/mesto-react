import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  const handleEditAvatarClick = () => onEditAvatar(true);
  const handleEditProfileClick = () => onEditProfile(true);
  const handleAddPlaceClick = () => onAddPlace(true);

  const cardsElements = cards.map(({ _id, ...props }) => (
    <li className="element" key={_id}>
      <Card {...props} onCardClick={onCardClick} />
    </li>
  ));

  React.useEffect(() => {
    Promise.all([api.getInitialUser(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Картинка профиля"
          />
          <button
            className="profile__edit-avatar-button"
            aria-label="Открыть редактирование картинки профиля"
            type="button"
            onClick={handleEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button"
              aria-label="Открыть редактирование профиля"
              type="button"
              onClick={handleEditProfileClick}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Открыть добавление изображений"
          type="button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
