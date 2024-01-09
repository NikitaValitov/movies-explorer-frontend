import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'
import { useMediaQuery } from '../../hooks/useMediaQuery';

function MoviesCardList({
   moviesList,
}) {

   const [filteredMovies, setFilteredMovies] = useState(moviesList); // отфильтрованные по чекбоксу и запросу фильмы

   localStorage.setItem('movies', JSON.stringify(filteredMovies))



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


   return (
      <section className='movies-card-list'>
         <div className='movies-card-list__container'>
            <ul className='movies-card-list__list'>
               {filteredMovies.slice(0, visibleCards).map((movie) => {
                  return (
                     <MoviesCard
                        key={movie.id || movie._id}
                        movie={movie}
                     />
                  )
               })}
            </ul>
            {
               (moviesList.length > visibleCards)
                  ?
                  (<button className='movies__btn' onClick={handleClickMoreMovies}>Ещё</button>)
                  :
                  ''
            }
         </div>
      </section>
   )
}

export default MoviesCardList;