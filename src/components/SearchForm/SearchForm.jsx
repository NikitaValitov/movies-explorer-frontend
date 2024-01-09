import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'
import { useState } from 'react';

function SearchForm({
   handleSearchSubmit,
   setIsSearch,
   value,
   setValue,
   shortMovies,
   handleShort,
}) {


   function handleSubmit(e) {
      e.preventDefault();
      handleSearchSubmit();
      setIsSearch(value);

   };

   function handleChangeInput(e) {
      setValue(e.target.value)
   };

   return (
      <section className="search">
         <div className='search__container'>
            <form
               className='search__form'
               name="search"
               onSubmit={handleSubmit}
            >
               <input
                  type="text"
                  name="search"
                  className='search__input'
                  placeholder="Фильм"
                  onChange={handleChangeInput}
                  value={value}

               />
               <button
                  className={`${value ? 'search__btn' : 'search__btn_disabled'}`}
                  type="submit"
                  disabled={!value}
               > Поиск
               </button>
            </form>
            <FilterCheckbox handleShort={handleShort} shortMovies={shortMovies} />
         </div>
      </section>
   )
}

export default SearchForm;