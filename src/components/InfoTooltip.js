import React from 'react';

import iconDone from '../images/icon-done.png';
import iconErr from '../images/icon-err.png';

const InfoTooltip = (props) => {
  return (
    <div className={`popup popup_name_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_name_tooltip ">
        <button
          className={`popup__close-icon popup__close-icon_name_tooltip`}
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup__tooltip-icon" src={props.isSuccess ? iconDone : iconErr}></img>

        <div className="popup__tooltip-text">
          {props.isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
