import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import {
  useLocation,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import * as auth from '../utils/auth.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup.js';
import RegisterPopup from './RegisterPopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
    [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
    [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
    [isImagePopupOpened, setIsImagePopupOpened] = useState(false),
    [isLoading, setIsLoading] = useState(false),
    [cardToDelete, setCardToDelete] = useState(null),
    [selectedCard, setSelectedCard] = useState({}),
    [currentUser, setCurrentUser] = useState(''),
    [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterOkPopupOpened, setIsRegisterOkPopupOpened] = useState(false);
  const [isRegisterErrorPopupOpened, setIsRegisterErrorPopupOpened] =
    useState(false);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const shouldRenderFooter =
    location.pathname !== '/sign-up' && location.pathname !== '/sign-in';

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpened(false);
    setIsRegisterOkPopupOpened(false);
    setIsRegisterErrorPopupOpened(false);
    setCardToDelete(null);
  }

  const handleOpenImagePopup = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  };

  function handleCardDelete(cardId) {
    setCardToDelete(cardId);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleConfirmBeforeDelete() {
    api
      .deleteCard(cardToDelete)
      .then(() => {
        setCards(cards.filter((item) => item._id !== cardToDelete));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    Promise.all([api.getInitialUser(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUser(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);

    api
      .editUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlace(data) {
    setIsLoading(true);

    api
      .postCard(data)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            const userData = {
              email: res.email,
            };
            setLoggedIn(true);
            setUserData(userData);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/mesto-react"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onImageClick={setIsImagePopupOpened}
                onCardClick={handleOpenImagePopup}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
                userData={userData}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                submitError={setIsRegisterErrorPopupOpened}
                submitOk={setIsRegisterOkPopupOpened}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
        </Routes>
        {/* <Main
          onEditAvatar={setIsEditAvatarPopupOpen}
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onImageClick={setIsImagePopupOpened}
          onCardClick={handleOpenImagePopup}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        /> */}
        {shouldRenderFooter && <Footer />}
        <InfoTooltip />
        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmationPopup
          isOpen={cardToDelete}
          onClose={closeAllPopups}
          onConfirm={handleConfirmBeforeDelete}
        />
        <ImagePopup
          isOpen={isImagePopupOpened}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <RegisterPopup
          isOpenOk={isRegisterOkPopupOpened}
          isOpenError={isRegisterErrorPopupOpened}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
