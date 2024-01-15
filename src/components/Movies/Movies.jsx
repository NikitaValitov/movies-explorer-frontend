import './Movies.css'
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from 'react';

function Movies({
   onMovieLike,
   onMovieDelete,
   savedMovies
}) {

   const [isLoading, setIsLoading] = useState(false); // прелоадер

   const [isShortMovies, setIsShortMovies] = useState(() => JSON.parse(localStorage.getItem('checkbox')) || false); // состояние чекбокса

   const [value, setValue] = useState(() => JSON.parse(localStorage.getItem('input-value')) || ''); // инпут

   const [filteredMovies, setFilteredMovies] = useState(() => JSON.parse(localStorage.getItem('movies')) || []); // все фильмы

   const [isError, setIsError] = useState(false); // ошибка сервера
   const [isNotFound, setIsNotFound] = useState(false); // ошибка фильмы не найдены


   // поиск фильмов
   function handleSubmit() {
      setIsLoading(true);
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (allMovies === null) {
         moviesApi
            .getMovies()
            .then((movies) => {
               // setMovies(movies);
               localStorage.setItem('allMovies', JSON.stringify(movies));
               filter();
               setIsError(false);
            })
            .catch((err) => {
               console.log('Ошибка при поиске фильмов: ', err);
               setIsError(true);
            })
            .finally(() => {
               setIsLoading(false);
            });
      } else {
         filter();
         setIsLoading(false);
      }
   }

   // фильтрация фильмов
   function filter() {
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      const filteredMovies = allMovies.filter(movie => {
         if (isShortMovies) {
            return ((movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase())) &&
               movie.duration <= 40)

         } else {
            return (movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase()))
         }
      })
      if (value) {
         setFilteredMovies(filteredMovies);
      }
      localStorage.setItem('input-value', JSON.stringify(value));
      localStorage.setItem('checkbox', JSON.stringify(isShortMovies));
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
   }

   // фильтрация короткометражек
   function filterShort() {
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      const filteredMovies = allMovies.filter(movie => {
         if (!isShortMovies) {
            return ((movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase())) &&
               movie.duration <= 40)

         } else {
            return (movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase()))
         }
      })
      setFilteredMovies(filteredMovies);
      localStorage.setItem('input-value', JSON.stringify(value));
      localStorage.setItem('checkbox', JSON.stringify(!isShortMovies));
      localStorage.setItem('movies', JSON.stringify(filteredMovies));
   }

   // переключение чекбокса
   function handleShort() {
      if (value) {
         setIsShortMovies(!isShortMovies);
         filterShort();
      }
      setIsShortMovies(!isShortMovies);
   }

   // удаление из LC при стираниии инпута
   if (!value) {
      localStorage.removeItem('input-value');
      localStorage.removeItem('checkbox');
      localStorage.removeItem('movies');
   }

   // проверка на ошибку наличия фильмов
   useEffect(() => {
      if (localStorage.getItem('movies')) {
         if (filteredMovies.length === 0) {
            setIsNotFound(true);
         } else {
            setIsNotFound(false);
         }
      } else {
         setIsNotFound(false);
      }
   }, [filteredMovies]);

   return (
      <main className="movies">
         <div className='movies__container'>
            <SearchForm
               value={value}
               setValue={setValue}
               handleSearchSubmit={handleSubmit}
               handleShort={handleShort}
               isShortMovies={isShortMovies}

            />
            {isLoading
               ?
               <Preloader />
               :
               <MoviesCardList
                  movies={filteredMovies}
                  isSavedFilms={false}
                  isError={isError}
                  isNotFound={isNotFound}
                  onMovieLike={onMovieLike}
                  onMovieDelete={onMovieDelete}
                  savedMovies={savedMovies}
               />
            }
         </div>
      </main>
   )
}

export default Movies;