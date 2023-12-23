import './Navigation.css'
import { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from '../../hooks/useMediaQuery';

function Navigation({ loggedIn }) {
   const location = useLocation();
   const [isOpen, setOpen] = useState(false);
   const isMobile = useMediaQuery('(max-width: 768px)');
   return (
      <div className='navigation'>
         {!loggedIn ?
            <nav className='navigation__list'>
               <NavLink className='navigation__link navigation__link_signup' to="/signup">
                  Регистрация
               </NavLink>
               <NavLink className='navigation__link navigation__link_signin' to="/signin">
                  Войти
               </NavLink>
            </nav>
            : !isMobile ?
               (<nav className='navigation__list'>
                  <NavLink className={({ isActive }) => `navigation__link navigation__link_movies ${isActive ? 'navigation__link_active' : ''}`} to="/movies">
                     Фильмы
                  </NavLink>
                  <NavLink className={({ isActive }) => `navigation__link navigation__link_saved-movies ${isActive ? 'navigation__link_active' : ''}`} to="/saved-movies">
                     Сохранённые фильмы
                  </NavLink>
                  <NavLink className={({ isActive }) => `navigation__link navigation__link_profile ${isActive ? 'navigation__link_active' : ''}`} to="/profile">
                     Аккаунт
                     <div className={`${location.pathname === '/' ? 'navigation__link_profile-logo' : 'navigation__link_profile-logo-dark'}`} />
                  </NavLink>
               </nav>)
               : (<div className={`navigation__mobile ${isOpen ? 'active' : ''}`}>
                  <nav className={`navigation__mobile-list ${isOpen ? 'active' : ''}`}>
                     <div className='navigation__mobile-links'>
                        <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_main ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/" onClick={() => setOpen(!isOpen)}>
                           Главная
                        </NavLink>
                        <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_movies ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/movies" onClick={() => setOpen(!isOpen)}>
                           Фильмы
                        </NavLink>
                        <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_saved-movies ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/saved-movies" onClick={() => setOpen(!isOpen)}>
                           Сохранённые фильмы
                        </NavLink>
                     </div>
                     <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_profile ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/profile" onClick={() => setOpen(!isOpen)}>
                        Аккаунт
                        <div className='navigation__link_profile-logo-dark' />
                     </NavLink>
                  </nav>
                  <div className={`btn ${isOpen ? 'active' : ''}`}>
                     <button className={`navigation__btn ${isOpen ? 'active' : ''}`} onClick={() => setOpen(!isOpen)} />
                  </div>
               </div>)
         }

         {/* {!isMobile ?
            <nav className='navigation__list'>
               <NavLink className={({ isActive }) => `navigation__link navigation__link_movies ${isActive ? 'navigation__link_active' : ''}`} to="/movies">
                  Фильмы
               </NavLink>
               <NavLink className={({ isActive }) => `navigation__link navigation__link_saved-movies ${isActive ? 'navigation__link_active' : ''}`} to="/saved-movies">
                  Сохранённые фильмы
               </NavLink>
               <NavLink className={({ isActive }) => `navigation__link navigation__link_profile ${isActive ? 'navigation__link_active' : ''}`} to="/profile">
                  Аккаунт
                  <div className={`${location.pathname === '/' ? 'navigation__link_profile-logo' : 'navigation__link_profile-logo-dark'}`} />
               </NavLink>
            </nav>
            :
            <div className={`navigation__mobile ${isOpen ? 'active' : ''}`}>
               <nav className={`navigation__mobile-list ${isOpen ? 'active' : ''}`}>
                  <div className='navigation__mobile-links'>
                     <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_main ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/" onClick={() => setOpen(!isOpen)}>
                        Главная
                     </NavLink>
                     <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_movies ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/movies" onClick={() => setOpen(!isOpen)}>
                        Фильмы
                     </NavLink>
                     <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_saved-movies ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/saved-movies" onClick={() => setOpen(!isOpen)}>
                        Сохранённые фильмы
                     </NavLink>
                  </div>
                  <NavLink className={({ isActive }) => `navigation__mobile-link navigation__mobile-link_profile ${isActive ? 'navigation__mobile-link_active' : ''}`} to="/profile" onClick={() => setOpen(!isOpen)}>
                     Аккаунт
                     <div className='navigation__link_profile-logo-dark' />
                  </NavLink>
               </nav>
               <div className={`btn ${isOpen ? 'active' : ''}`}>
                  <button className={`navigation__btn ${isOpen ? 'active' : ''}`} onClick={() => setOpen(!isOpen)} />
               </div>
            </div>
         } */}
      </div>
   )
}

export default Navigation;