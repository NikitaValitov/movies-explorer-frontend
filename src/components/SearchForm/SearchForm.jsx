import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm({
   handleSearchSubmit,
   value,
   setValue,
   handleShort,
   isShortMovies
}) {
   
   const [isQueryError, setIsQueryError] = useState(false);

   function handleSubmit(e) {
      e.preventDefault();
      if (value.trim().length === 0) {
         setIsQueryError(true);
       } else {
         setIsQueryError(false);
       }
      handleSearchSubmit();
   };

   function handleChangeInput(e) {
      setValue(e.target.value)
   };

   return (
      <section className="search">
         <div className='search__container'>
            <form
               className='search__form'
               onSubmit={handleSubmit}
            >
               <input
                  type="text"
                  className='search__input'
                  placeholder="Фильм"
                  onChange={handleChangeInput}
                  value={value}
                  // required
               />
               
               <button
                  className={`${value ? 'search__btn' : 'search__btn_disabled'}`}
                  type="submit"
                  // disabled={!value}
               > Поиск
               </button>
            </form>
            {isQueryError && <span className="search__error">Нужно ввести ключевое слово</span>}
            <FilterCheckbox handleShort={handleShort} isShortMovies={isShortMovies} />
         </div>
      </section>
   )
}

export default SearchForm;
