import './MoviesCard.css'
import { useState } from 'react';
import { useLocation } from "react-router-dom";

function MoviesCard({
   movie,
   saved,
   isSavedFilms,
   savedMovies,
   onMovieLike,
   onMovieDelete,
}) {

   const location = useLocation();

   // Преобразование минут в *ч *м
   function getTimeFromMins(mins) {
      const hours = Math.trunc(mins / 60);
      const minutes = mins % 60;
      return hours + 'ч ' + minutes + 'м';
   };

   function onClick() {
      if (saved) {
         onMovieDelete(savedMovies.filter((item) => item.movieId === movie.id)[0]);
      } else {
         onMovieLike(movie);
      }
   }

   function onDelete() {
      onMovieDelete(movie);
   }

   return (
      <li className='movie'>
         <div className='movie__info'>
            <p className='movie__name'>{movie.nameRU}</p>
            <p className='movie__duration'>{getTimeFromMins(movie.duration)}</p>
         </div>
         <a className='movie__trailer' href={movie.trailerLink} target='_blank' rel="noreferrer" >
            <img className='movie__image' src={!isSavedFilms ? 'https://api.nomoreparties.co' + movie.image.url : movie.image} alt={movie.nameRU} />
         </a>
         {!isSavedFilms ? (
            <button className={`movie__btn-save ${saved ? 'active' : ''}`} onClick={onClick}>{saved ? '' : 'Сохранить'}</button>
         ) : (
            <button className='movie__btn-unsave' onClick={onDelete} ></button>
         )}
      </li>
   )
}

export default MoviesCard;