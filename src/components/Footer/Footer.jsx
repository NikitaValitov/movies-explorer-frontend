import './Footer.css'

function Footer() {
   return (
      <section className='footer'>
         <div className='footer__container'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__info'>
               <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
               <ul className='footer__links'>
                  <li className='footer__item'>
                     <a href="https://practicum.yandex.ru" className='footer__link'>Яндекс.Практикум</a>
                  </li>
                  <li className='footer__item'>
                     <a href="https://github.com/NikitaValitov" className='footer__link'>Github</a>
                  </li>
               </ul>
            </div>
         </div>
      </section>
   )
}

export default Footer;