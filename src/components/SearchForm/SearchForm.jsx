import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm() {
   return (
      <section className="search">
         <div className='search__container'>
            <form className='search__form'>
               <input
                  type="text"
                  className='search__input'
                  placeholder="Фильм"
                  required
               />
               <button
                  className='search__btn'
                  type="submit"
               > Поиск
               </button>
            </form>
            <FilterCheckbox></FilterCheckbox>
         </div>
      </section>
   )
}

export default SearchForm;