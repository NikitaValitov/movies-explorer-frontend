import './SavedMovies.css'
import { initialSavedMovies } from '../../utils/constants';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
   return (
      <section className="saved-movies">
         <div className='saved-movies__container'>
            <SearchForm />
            <MoviesCardList movies={initialSavedMovies} />
         </div>
      </section>
   )
}

export default SavedMovies;