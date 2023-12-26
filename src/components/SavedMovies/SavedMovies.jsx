import './SavedMovies.css'
import { initialSavedMovies } from '../../utils/constants';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
   return (
      <main className="saved-movies">
         <div className='saved-movies__container'>
            <SearchForm />
            <MoviesCardList movies={initialSavedMovies} />
         </div>
      </main>
   )
}

export default SavedMovies;