import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import * as auth from '../utils/auth.js';

const Login = ({ handleLogin }) => {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.password || !formValue.email) {
      return;
    }
    auth
      .authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({ password: '', email: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <div className="auth">
      <PopupWithForm
        name="auth"
        title="Вход"
        onSubmit={handleSubmit}
        btnText="Войти"
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            name="email"
            placeholder="Email"
            type="email"
            required
            minLength="2"
            maxLength="200"
            value={formValue.email}
            onChange={handleChange}
          />
          <span className="about-error popup__input-error" />
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            name="password"
            placeholder="Пароль"
            type="password"
            required
            minLength="2"
            maxLength="200"
            value={formValue.password}
            onChange={handleChange}
          />
          <span className="about-error popup__input-error" />
        </label>
      </PopupWithForm>
    </div>
  );
};

export default Login;
