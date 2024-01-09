import './FilterCheckbox.css'

function FilterCheckbox({ handleShort, shortMovies }) {
   return (
      <div className="checkbox">
         <input type="checkbox"
         className='checkbox__input'
         onChange={handleShort}
         checked={shortMovies ? true : false}
         />
         <span className='checkbox__text'>Короткометражки</span>
      </div>
   )
}

export default FilterCheckbox;