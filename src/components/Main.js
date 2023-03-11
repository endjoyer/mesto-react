import React from 'react';

function Main(props) {
  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="#" alt="Картинка профиля" />
          <button
            className="profile__edit-avatar-button"
            aria-label="Открыть редактирование картинки профиля"
            type="button"
            onClick={() => props.onEditAvatar(true)}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title"></h1>
            <button
              className="profile__edit-button"
              aria-label="Открыть редактирование профиля"
              type="button"
              onClick={() => props.onEditProfile(true)}
            ></button>
          </div>
          <p className="profile__subtitle"></p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Открыть добавление изображений"
          type="button"
          onClick={() => props.onAddPlace(true)}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container"></ul>
      </section>
    </main>
  );
}

export default Main;
