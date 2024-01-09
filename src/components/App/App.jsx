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
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const checkToken = async (jwt) => {
    return auth.checkToken(jwt)
      .then((res) => {
        if (jwt) {
          // setLoggedIn(true);
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

  const logOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
  };

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
              // movies={movies}
              // getAllMovies={getAllMovies}
              />}
            />
            <Route
              path='/saved-movies'
              element={<ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
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
