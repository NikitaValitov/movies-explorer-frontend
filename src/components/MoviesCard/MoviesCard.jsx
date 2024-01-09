import './MoviesCard.css'
import { useState } from 'react';
import { useLocation } from "react-router-dom";

function MoviesCard({
   movie
}) {

   // Преобразование минут в *ч *м
   function getTimeFromMins(mins) {
      const hours = Math.trunc(mins / 60);
      const minutes = mins % 60;
      return hours + 'ч ' + minutes + 'м';
   };

   const [isActive, setIsActive] = useState(false)
   const location = useLocation();
   return (
      <li className='movie'>
         <div className='movie__info'>
            <p className='movie__name'>{movie.nameRU}</p>
            <p className='movie__duration'>{getTimeFromMins(movie.duration)}</p>
         </div>
         <img className='movie__image' src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
         {location.pathname === '/movies' ? (
            <button className={`movie__btn-save ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>{isActive ? '' : 'Сохранить'}</button>
         ) : (
            <button className='movie__btn-unsave'></button>
         )}
      </li>
   )
}

export default MoviesCard;