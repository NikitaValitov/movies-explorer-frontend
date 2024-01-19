import './App.css';
import { Route, Routes, useLocation, useNavigate, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { useEffect, useState } from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import PopupSuccess from '../PopupSuccess/PopupSuccess';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import mainApi from '../../utils/MainApi';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState({
    status: "",
    text: "",
  });


  //проверка токена 

  const checkToken = async (jwt) => {
    return auth.checkToken(jwt)
      .then(() => {
        if (jwt) {
          mainApi.getUserInfo()
            .then(data => {
              setLoggedIn(true);
              setCurrentUser(data);
              navigate(location.pathname);
            })
        }
      })
      .catch((err) => {
        console.err('Что-то пошло не так, ошибка: ', err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      checkToken(jwt);
    }
  }, []);

  // регитрация

  const onRegister = ({ email, password, name }) => {
    setIsLoading(true);
    return auth.register(email, password, name)
      .then(() => {
        onLogin({ email, password })
        setCurrentUser({ email, password });
      })
      .catch((err) => {
        if (err === 409) {
          setIsInfoTooltipOpen(true);
          setInfoTooltipMessage({
            status: false,
            text: "Пользователь с таким email уже существует",
          });
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // авторизация

  const onLogin = ({ email, password, name }) => {
    setIsLoading(true);
    return auth.authorize(email, password)
      .then((res) => {
        if (!res) throw new Error('Неправильные почта пользователя или пароль');
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          navigate('/movies', { replace: true });;
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        console.log('Что-то пошло не так, ошибка: ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // выход

  const logOut = () => {
    // localStorage.removeItem('jwt');
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  };

  // получение инфо

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then(res => setCurrentUser(res))
        .catch((err) => {
          console.log('Ошибка при получении данных юзера и карточек: ', err);
        })
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getMovies()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse());
        })
        .catch((err) => {
          console.log('Ошибка при получении фильмов: ', err);
        })
    }
  }, [currentUser, loggedIn]);

  // изменение данных пользователя

  const updateUser = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .editUserInfo(name, email)
      .then(() => {
        setCurrentUser((previousData) => ({ ...previousData, name, email }));
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage({
          status: true,
          text: "Информация успешно изменена!",
        })
      })
      .catch((err) => {
        if (err === 409) {
          setIsInfoTooltipOpen(true);
          setInfoTooltipMessage({
            status: false,
            text: "Пользователь с таким email уже существует",
          });
        } else {
          setIsInfoTooltipOpen(true);
          setInfoTooltipMessage({
            status: false,
            text: "Что-то пошло не так, ошибка: ! Попробуйте ещё раз.",
          });
        }
        console.log(err);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }

  function closePopup() {
    setIsInfoTooltipOpen(false);
  }

  // постановка лайка

  function handleMovieLike(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log('Ошибка при добавлении фильма в сохраненные: ', err);
      });
  }

  // удаление лайка

  function handleMovieDelete(movie) {
    const movieId = movie._id || savedMovies.find((i) => i.movieId === movie.movieId)._id;
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((prevSavedMovies) =>
          prevSavedMovies.filter((savedMovie) => savedMovie._id !== movieId)
        )
      })
      .catch((err) => {
        console.log('Ошибка при удалении фильма из сохраненных: ', err);
      });
  }

  return (
    <div className="app">
      {isLoading ? (
        <Preloader
        />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          {['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname) && <Header loggedIn={loggedIn} />}
          <Routes>
            <Route
              path='*'
              element={<NotFound />}
            />
            <Route
              path='/signup'
              element={<ProtectedRoute
                element={Register}
                loggedIn={!loggedIn}
                onRegister={onRegister}
              />}
            />
            <Route
              path='/signin'
              element={<ProtectedRoute
                element={Login}
                loggedIn={!loggedIn}
                onLogin={onLogin}
              />}
            />
            <Route
              path='/'
              element={<Main />}
            />
            <Route
              path='/movies'
              element={<ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                onMovieLike={handleMovieLike}
                onMovieDelete={handleMovieDelete}
                savedMovies={savedMovies}
              />}
            />
            <Route
              path='/saved-movies'
              element={<ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                onMovieDelete={handleMovieDelete}
                savedMovies={savedMovies}
              />}
            />
            <Route
              path='/profile'
              element={<ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                logOut={logOut}
                updateUser={updateUser}
              />}
            />
          </Routes>
          <PopupSuccess
            message={infoTooltipMessage}
            isOpen={isInfoTooltipOpen}
            onClose={closePopup}
          />
          {['/', '/movies', '/saved-movies'].includes(location.pathname) && <Footer />}
        </CurrentUserContext.Provider>)}
    </div>
  )
}

export default App;
