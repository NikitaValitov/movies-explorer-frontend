import './Portfolio.css'

function Portfolio() {
   return (
      <section className='portfolio'>
         <div className='portfolio__container'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
               <li className='portfolio__item'>
                  <a href="https://github.com/NikitaValitov/how-to-learn" className='portfolio__link' target='_blank' rel='noopener noreferrer'>
                     <p className='portfolio__link-text'>Статичный сайт</p>
                     <p className='portfolio__link-img'>↗</p>
                  </a>
               </li>
               <li className='portfolio__item'>
                  <a href="https://github.com/NikitaValitov/russian-travel" className='portfolio__link' target='_blank' rel='noopener noreferrer'>
                     <p className='portfolio__link-text'>Адаптивный сайт</p>
                     <p className='portfolio__link-img'>↗</p>
                  </a>

               </li>
               <li className='portfolio__item'>
                  <a href="https://github.com/NikitaValitov/react-mesto-api-full-gha" className='portfolio__link' target='_blank' rel='noopener noreferrer'>
                     <p className='portfolio__link-text'>Одностраничное приложение</p>
                     <p className='portfolio__link-img'>↗</p>
                  </a>
               </li>
            </ul>
         </div>
      </section>
   )
}

export default Portfolio;