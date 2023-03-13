import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialUser()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(
          cardData.map((item) => {
            return {
              id: item._id,
              likes: item.likes,
              name: item.name,
              link: item.link,
            };
          })
        );
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
            onClick={() => onEditAvatar(true)}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button"
              aria-label="Открыть редактирование профиля"
              type="button"
              onClick={() => onEditProfile(true)}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Открыть добавление изображений"
          type="button"
          onClick={() => onAddPlace(true)}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map(({ id, ...props }) => (
            <Card
              key={id}
              {...props}
              onCardClick={onCardClick}
              // onClose={props.closeAllPopups}
              // isOpen={props.selectedCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
