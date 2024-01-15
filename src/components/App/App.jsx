import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
        console.error('Что-то пошло не так', err);
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
      .then(() => onLogin({ email, password }))
      .catch((err) => {
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
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.error('Что-то пошло не так', err);
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

  // useEffect(() => {
  //   Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
  //     .then(([data, movies]) => {
  //       setCurrentUser(data);
  //       setSavedMovies(movies.reverse());
  //     })
  //     .catch((err) => {
  //       console.log('Ошибка при получении данных юзера и фильмов: ', err);
  //     })
  // }, [])

  useEffect(() => {

      mainApi
        .getUserInfo()
        .then(res => setCurrentUser(res))
        .catch((err) => {
          console.log('Ошибка при получении данных юзера и карточек: ', err);
        })
      mainApi
        .getMovies()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse());
        })
        .catch((err) => {
          console.log('Ошибка при получении фильмов: ', err);
        })
    
  }, []);



  // изменение данных пользователя

  const updateUser = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .editUserInfo(name, email)
      .then(() => {
        setCurrentUser((previousData) => ({ ...previousData, name, email }));
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              element={<Register
                onRegister={onRegister}
              />}

            />
            <Route
              path='/signin'
              element={<Login
                onLogin={onLogin} />}

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
          {['/', '/movies', '/saved-movies'].includes(location.pathname) && <Footer />}
        </CurrentUserContext.Provider>)}
    </div>
  )
}

export default App;
