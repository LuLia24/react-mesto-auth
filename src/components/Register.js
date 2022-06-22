import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { register } from '../utils/auth';

const Register = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    register(email, password)
      .then((res) => {
        if (res) {
          props.handleInfoTooltip(true);
          props.history.push('/sign-in');
        } else {
          props.handleInfoTooltip(false);
        }
      })
      .catch((err) => {
        props.handleInfoTooltip(false);
        console.log(err);
      });
  }

  return (
    <div className={`popup popup_name_register popup_opened popup_theme_black`}>
      <div className="popup__container popup__container_theme_black">
        <h2 className="popup__title popup__title_theme_black">Регистрация</h2>

        <form
          action="#"
          className={`popup__form popup__form_name_register`}
          name="register"
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__set popup__set_theme_black">
            <label className="popup__label-input">
              <input
                type="email"
                className="popup__input popup__input_type_email popup__input_theme_black"
                name="email"
                onChange={handleChangeEmail}
                value={email}
                placeholder="Email"
                required
              />
              <span className="popup__input-error email-error"></span>
            </label>

            <label className="popup__label-input">
              <input
                onChange={handleChangePassword}
                type="password"
                className="popup__input popup__input_type_password popup__input_theme_black"
                name="password"
                value={password}
                placeholder="Пароль"
                required
              />
              <span className="popup__input-error password-error"></span>
            </label>
          </fieldset>
          <button className="popup__submit popup__submit_theme_black" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="popup__register-text">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="popup__register-link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
