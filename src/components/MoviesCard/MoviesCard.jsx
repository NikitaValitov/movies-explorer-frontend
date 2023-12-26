import './MoviesCard.css'
import { useState } from 'react';
import {  useLocation } from "react-router-dom";

function MoviesCard({name, duration, image}) {
   const [isActive, setIsActive] = useState(false)
   const location = useLocation();
   return (
      <li className='movie'>
         <div className='movie__info'>
            <p className='movie__name'>{name}</p>
            <p className='movie__duration'>{duration}</p>
         </div>
         <img className='movie__image' src={image} alt="карточка фильма" />
         {location.pathname === '/movies' ? (
            <button className={`movie__btn-save ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>{isActive ? '' : 'Сохранить'}</button>
         ) : (
            <button className='movie__btn-unsave'></button>
         )}
      </li>
   )
}

export default MoviesCard;