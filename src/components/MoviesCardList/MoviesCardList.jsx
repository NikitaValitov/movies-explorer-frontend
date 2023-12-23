import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'

function MoviesCardList({movies}) {
   return (
      <section className='movies-card-list'>
         <div className='movies-card-list__container'>
            <ul className='movies-card-list__list'>
               {movies.map((movie) => {
                  return (
                     <MoviesCard
                        name={movie.name}
                        duration={movie.duration}
                        image={movie.image}
                        key={movie.id}
                     />
                  )
               })}
            </ul>
         </div>
      </section>
   )
}

export default MoviesCardList;