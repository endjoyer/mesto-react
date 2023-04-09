import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import * as auth from '../utils/auth.js';

const Register = ({ submitOk, submitError }) => {
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
    auth
      .register(formValue.password, formValue.email)
      .then((res) => {
        if (res.data) {
          console.log(res);
          navigate('/sign-in', { replace: true });
          submitOk(true);
        } else {
          submitError(true);
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
        title="Регистрация"
        onSubmit={handleSubmit}
        btnText="Зарегистрироваться"
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
        <div className="auth__signup">
          <p className="signup__text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="signup__link">
            Войти
          </Link>
        </div>
      </PopupWithForm>
    </div>
  );
};

export default Register;
