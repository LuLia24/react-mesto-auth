import React from 'react';
import api from '../utils/api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Route, Switch, withRouter } from 'react-router-dom';
import { veryficationToken } from '../utils/auth';

function App(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('user@email.ru');

  React.useEffect(() => {
    checkToken();
  }, []);

  function getData() {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([userRes, cardRes]) => {
        //user
        setCurrentUser(userRes);
        //cards
        setCards(cardRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('token');
    handleLogin(false);
    handleSetUserEmail('');
    props.history.push('/sign-in');
  }

  function handleInfoTooltip(state) {
    setIsSuccess(state);
    setIsInfoTooltipPopupOpen(true);
  }

  function checkToken() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');

      veryficationToken(jwt)
        .then((res) => {
          if (res) {
            handleLogin(true);
            getData();
            handleSetUserEmail(res.data.email);
            props.history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.history.push('/sign-up');
    }
  }

  function handleLogin(log) {
    setLoggedIn(log);
  }

  function handleSetUserEmail(email) {
    setUserEmail(email);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(obj) {
    api
      .setUser(obj.name, obj.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(obj) {
    api
      .setAvatar(obj.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((res) => {
          setCards(
            cards.map((item) => {
              return item._id === card._id ? res : item;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .setLike(card._id)
        .then((res) => {
          setCards(
            cards.map((item) => {
              return item._id === card._id ? res : item;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((prevCards) => {
          return prevCards.filter((item) => {
            return !(item._id === card._id);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(obj) {
    api
      .setCard(obj.name, obj.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Switch>
          <Route path="/sign-up">
            <Header linkHeader={'/sign-in'} />
            <Register handleInfoTooltip={handleInfoTooltip} />
          </Route>
          <Route path="/sign-in">
            <Header linkHeader={'/sign-up'} />
            <Login
              handleLogin={handleLogin}
              getData={getData}
              handleSetUserEmail={handleSetUserEmail}
              handleInfoTooltip={handleInfoTooltip}
            />
          </Route>
          <ProtectedRoute
            path="/"
            signOut={signOut}
            componentHeader={Header}
            componentFooter={Footer}
            componentMain={Main}
            userEmail={userEmail}
            linkHeader={''}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
          ></ProtectedRoute>
        </Switch>
      </div>

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />

      <PopupWithForm name={'del'} title={'Вы уверены?'} buttonText={'Да'}></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
