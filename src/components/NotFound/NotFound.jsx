import { useNavigate } from 'react-router-dom';
import './NotFound.css'

function NotFound() {
   const navigate = useNavigate();
   return (
      <section className="not-found">
         <div className='not-found__text'>
            <h2 className='not-found__number'>404</h2>
            <p className='not-found__error'>Страница не найдена</p>
         </div>
         <button className='not-found__btn' onClick={() => navigate(-1)}>Назад</button>
      </section>
   )
}

export default NotFound;