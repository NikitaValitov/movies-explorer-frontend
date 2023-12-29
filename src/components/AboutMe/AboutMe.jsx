import './AboutMe.css'
import avatar from '../../images/avatar.jpg'

function AboutMe() {
   return (
      <section className='about-me'>
         <div className='about-me__container'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__content'>
               <div className='about-me__information'>
                  <div className='about-me__life'>
                     <h3 className='about-me__name'>Никита</h3>
                     <p className='about-me__info'>Фронтенд-разработчик, 27 лет</p>
                     <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С
                        2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-
                        разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                  </div>
                  <a href='https://github.com/NikitaValitov' className='about-me__link'>Github</a>
               </div>
               <img className='about-me__avatar' src={avatar} alt="Аватар" />
            </div>
         </div>
      </section>
   )
}

export default AboutMe;