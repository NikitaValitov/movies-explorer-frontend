import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { useState } from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app">
      {['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname) && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route
          path='*'
          element={<NotFound />}
        />
        <Route
          path='/signup'
          element={<Register />}
        />
        <Route
          path='/signin'
          element={<Login />}
        />
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/movies'
          element={<Movies />}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
      </Routes>
      {['/', '/movies', '/saved-movies'].includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App;
