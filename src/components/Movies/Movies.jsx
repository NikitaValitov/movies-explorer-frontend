import './Movies.css'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useContext, useEffect, useState } from 'react';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import useLocalStorageState from '../../hooks/useLocalStorageState'
// import CurrentUserContext from '../../contexts/CurrentUserContext'

function Movies() {

   // const currentUser = useContext(CurrentUserContext);

   const [shortMovies, setShortMovies] = useState(() => JSON.parse(localStorage.getItem('checkbox')) || false); // 1 состояние чекбокса

   // const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы

   const [infotooltip, setInfotooltip] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   const [movies, setMovies] = useState([]); // Все фильмы с API



   const [value, setValue] = useState(JSON.parse(localStorage.getItem('searching-string'))); // стейт инпута

   const [isSearch, setIsSearch] = useState(JSON.parse(localStorage.getItem('searching-string'))); // 6 стейст после поиска


   const unputLocal =
      // чекбокс в localStorage
      useEffect(() => {
         localStorage.setItem('checkbox', JSON.stringify(shortMovies))
      }, [shortMovies])

   // инпут в localStorage
   useEffect(() => {
      localStorage.setItem('searching-string', JSON.stringify(isSearch))
   }, [isSearch])


   if (!value) {
      localStorage.removeItem('movies')
   }

   //обнуление стейтов после удаления инпута
   useEffect(() => {
      if (value === '') {
         setIsSearch('');
         setMovies([])
      }
   }, [value])

   function handleShort() {
      setShortMovies(!shortMovies);
      handleSearchSubmit()
   }

   // фильтрация инпута
   const filterMovies = movies.filter(movie => {
      if (shortMovies) {
         return ((movie.nameRU.toLowerCase().includes(isSearch.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(isSearch.toLowerCase())) &&
            movie.duration <= 40)

      } else {
         return (movie.nameRU.toLowerCase().includes(isSearch.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(isSearch.toLowerCase()))
      }
   });
   // const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы

   console.log(filterMovies.length)

   function handleSearchSubmit() {
      setIsLoading(true);
      moviesApi.getMovies()
         .then((movies) => {
            setMovies(movies);

         })
         .catch((err) => {
            console.log('Ошибка при поиске фильмов: ', err);
            setInfotooltip('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
         })
         .finally(() => {
            setIsLoading(false);
         });

   }

   const [notFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
   // if (filterMovies.length === 0) {
   //    setNotFound(true);
   // }

   const savedIsSearch = JSON.parse(localStorage.getItem("movies"));

   return (
      <main className="movies">
         <div className='movies__container'>
            <SearchForm
               handleSearchSubmit={handleSearchSubmit}
               setIsSearch={setIsSearch}
               value={value}
               setValue={setValue}
               handleShort={handleShort}
               shortMovies={shortMovies}
            // handleShortFilms={handleShortFilms}
            />
            {isLoading ? <Preloader /> :
               (isSearch ? (((savedIsSearch) && (savedIsSearch.length > 0) && (filterMovies.length === 0) && (filterMovies.length !== 0) ? <MoviesCardList moviesList={savedIsSearch} /> :
                  (filterMovies.length > 0 ? <MoviesCardList moviesList={filterMovies} notFound={notFound} setNotFound={setNotFound}  /> : ''))) : '')
            }
            {(isSearch && filterMovies.length === 0 && movies.length !== 0 ? (<InfoTooltip infotooltip={infotooltip || 'Ничего не найдено'} />) : '')}
         </div>
      </main>
   )
}

export default Movies;