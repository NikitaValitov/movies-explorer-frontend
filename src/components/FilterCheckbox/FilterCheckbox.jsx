import './FilterCheckbox.css'

function FilterCheckbox() {
   return (
      <div className="checkbox">
         <input type="checkbox" className='checkbox__input'/>
         <span className='checkbox__text'>Короткометражки</span>
      </div>
   )
}

export default FilterCheckbox;