import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import { useLocation } from 'react-router-dom';

function MoviesCardList({
   movies,
   isError,
   isNotFound,
   isSavedFilms,
   onMovieLike,
   onMovieDelete,
   savedMovies
}) {

   const location = useLocation();

   const isMobile = useMediaQuery('(max-width: 480px)');
   const isTablet = useMediaQuery('(max-width: 1103px)');
   const isDecstop = useMediaQuery('(min-width: 1104px)');

   const [visibleCards, setVisibleCards] = useState();

   function handleClickMoreMovies() {
      let more;
      if (isDecstop) { more = 3 }
      if (isTablet) { more = 2 }
      if (isMobile) { more = 2 }
      const newVisibleCards = visibleCards + more;
      setVisibleCards(newVisibleCards);
   }

   useEffect(() => {
      if (isDecstop) {
         setVisibleCards(12);
      }
      if (isTablet) {
         setVisibleCards(8);
      }
      if (isMobile) {
         setVisibleCards(5);
      }
   }, [isTablet, isMobile, isDecstop])

   function getSavedMovieCard(savedMovies, movie) {
      return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
   }

   return (
      <section className='movies-card-list'>
         {isError && <InfoTooltip text={'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'} />}
         {isNotFound && <InfoTooltip text={'Ничего не найдено'} />}
         <div className='movies-card-list__container'>
            {location.pathname === '/saved-movies' ? (
               <>
                  <ul className='movies-card-list__list'>
                     {movies.map((movie) => {
                        return (
                           <MoviesCard
                              key={isSavedFilms ? movie._id : movie.id}
                              isSavedFilms={isSavedFilms}
                              movie={movie}
                              saved={getSavedMovieCard(savedMovies, movie)}
                              onMovieLike={onMovieLike}
                              onMovieDelete={onMovieDelete}
                              savedMovies={savedMovies}
                           />
                        )
                     })}
                  </ul>
               </>
            ) : (
               <>
                  <ul className='movies-card-list__list'>
                     {movies.slice(0, visibleCards).map((movie) => {
                        return (
                           <MoviesCard
                              key={isSavedFilms ? movie._id : movie.id}
                              isSavedFilms={isSavedFilms}
                              movie={movie}
                              saved={getSavedMovieCard(savedMovies, movie)}
                              onMovieLike={onMovieLike}
                              onMovieDelete={onMovieDelete}
                              savedMovies={savedMovies}
                           />
                        )
                     })}
                  </ul>
                  {
                     (movies.length > visibleCards)
                        ?
                        (<button className='movies__btn' onClick={handleClickMoreMovies}>Ещё</button>)
                        :
                        ''
                  }
               </>
            )}

         </div>
      </section>
   )
}

export default MoviesCardList;
