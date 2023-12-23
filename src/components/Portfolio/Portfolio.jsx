import './Portfolio.css'

function Portfolio() {
   return (
      <section className='portfolio'>
         <div className='portfolio__container'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
               <li className='portfolio__item'>
                  <a href="https://github.com/NikitaValitov/how-to-learn" className='portfolio__link'>Статичный сайт</a>
                  <a href="https://github.com/NikitaValitov/how-to-learn" className='portfolio__link-img'>↗</a>
               </li>
               <li className='portfolio__item'>
                  <a href="https://github.com/NikitaValitov/russian-travel" className='portfolio__link'>Адаптивный сайт</a>
                  <a href="https://github.com/NikitaValitov/russian-travel" className='portfolio__link-img'>↗</a>
               </li>
               <li className='portfolio__item'>
                  <a href="https://github.com/NikitaValitov/react-mesto-api-full-gha" className='portfolio__link'>Одностраничное приложение</a>
                  <a href="https://github.com/NikitaValitov/react-mesto-api-full-gha" className='portfolio__link-img'>↗</a>
               </li>
            </ul>
         </div>
      </section>
   )
}

export default Portfolio;