import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  const [isBurgerClicked, setIsBurgerClicked] = React.useState(false);

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked);
  }

  let link = '';
  if (props.linkHeader === '/sign-in') {
    link = (
      <Link to={props.linkHeader} className="header__link">
        Войти
      </Link>
    );
  } else if (props.linkHeader === '/sign-up') {
    link = (
      <Link to={props.linkHeader} className="header__link">
        Регистрация
      </Link>
    );
  } else {
    link = (
      <>
        <div
          className={`header__email-container ${
            isBurgerClicked ? 'header__email-container_opened' : ''
          }`}
        >
          <p className="header__email">{props.userEmail}</p>
          <p onClick={props.signOut} className="header__email-text">
            Выход
          </p>
        </div>

        {isBurgerClicked ? (
          <button
            className={'popup__close-icon popup__close-icon_name_burger'}
            type="button"
            onClick={handleBurgerClick}
          ></button>
        ) : (
          <div onClick={handleBurgerClick} className="header__burger">
            <div className="header__burger-item"></div>
            <div className="header__burger-item"></div>
            <div className="header__burger-item"></div>
          </div>
        )}
      </>
    );
  }
  return (
    <header className="header">
      <img src={logo} alt="логотип место." className="header__logo" />
      {link}
    </header>
  );
}

export default Header;
