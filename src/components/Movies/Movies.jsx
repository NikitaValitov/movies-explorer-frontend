import './Movies.css'
import { initialMovies } from '../../utils/constants';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
   return (
      <main className="movies">
         <div className='movies__container'>
            <SearchForm />
            <MoviesCardList movies={initialMovies} />
            <button className='movies__btn'>Ещё</button>
         </div>
      </main>
   )
}

export default Movies;