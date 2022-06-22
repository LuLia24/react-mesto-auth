import React from 'react';
import { withRouter } from 'react-router-dom';
import { login, veryficationToken } from '../utils/auth';

const Login = (props) => {
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

    login(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);

          veryficationToken(localStorage.getItem('token'))
            .then((res) => {
              if (res) {
                props.handleLogin(true);
                props.handleSetUserEmail(res.data.email);
                props.history.push('/');
              } else {
                props.handleInfoTooltip(false);
              }
            })
            .catch((err) => {
              props.handleInfoTooltip(false);
              console.log(err);
            });
        } else {
          props.handleInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`popup popup_name_login popup_opened popup_theme_black`}>
      <div className="popup__container popup__container_theme_black">
        <h2 className="popup__title popup__title_theme_black">Вход</h2>

        <form
          action="#"
          className={`popup__form popup__form_name_login`}
          name="login"
          noValidate
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
