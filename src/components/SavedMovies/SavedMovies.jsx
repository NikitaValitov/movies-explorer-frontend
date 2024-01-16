import './SavedMovies.css'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';
import { useEffect, useState } from 'react';

function SavedMovies({
   onMovieDelete,
   savedMovies
}) {

   const [value, setValue] = useState(''); // инпут

   const [isShortMovies, setIsShortMovies] = useState(false); // состояние чекбокса

   const [filteredMovies, setFilteredMovies] = useState(savedMovies); // отфильтрованные фильмы

   const [isNotFound, setIsNotFound] = useState(false); // ошибка фильмы не найдены

   useEffect(() => {
      setFilteredMovies(savedMovies)
   }, [savedMovies])

   useEffect(() => {
      if (value === '' && !isShortMovies) {
         setFilteredMovies(savedMovies)
      }
   })

   useEffect(() => {
      const filtereddMovies = savedMovies.filter(movie => {
         if (isShortMovies) {
            return ((movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase())) &&
               movie.duration <= 40)

         } else {
            return (movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase()))
         }
      })
      if (filtereddMovies.length === 0) {
         setFilteredMovies(filtereddMovies);
         setIsNotFound(true);
      }

   })

   function handleSubmit() {
      const filtereddMovies = savedMovies.filter(movie => {
         if (isShortMovies) {
            return ((movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase())) &&
               movie.duration <= 40)

         } else {
            return (movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase()))
         }
      })
      setFilteredMovies(filtereddMovies);

   }

   function handleShort() {
      setIsShortMovies(!isShortMovies);
      const filteredShortMovies = savedMovies.filter(movie => {
         if (!isShortMovies) {
            return ((movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase())) &&
               movie.duration <= 40)

         } else {
            return (movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
               movie.nameEN.toLowerCase().includes(value.toLowerCase()))
         }
      })
      setFilteredMovies(filteredShortMovies);
   }

   // проверка на ошибку наличия фильмов
   useEffect(() => {
      if (filteredMovies.length === 0) {
         setIsNotFound(true);
      } else {
         setIsNotFound(false);
      }
   }, [filteredMovies]);

   return (
      <main className="saved-movies">
         <div className='saved-movies__container'>
            <SearchForm
               value={value}
               setValue={setValue}
               handleSearchSubmit={handleSubmit}
               handleShort={handleShort}
               isShortMovies={isShortMovies}
            />
            <MoviesCardList
               value={value}
               movies={filteredMovies}
               isSavedFilms={true}
               onMovieDelete={onMovieDelete}
               savedMovies={savedMovies}
               isNotFound={isNotFound}
            />
         </div>
      </main>
   )
}

export default SavedMovies;