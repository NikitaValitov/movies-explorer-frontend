import './AboutProject.css'

function AboutProject() {
   return (
      <section className='about-project' id='about-project'>
         <div className='about-project__container'>
            <h2 className='about-project__title'>О проекте</h2>
            <div className='about-project__info'>
               <div className='about-project__section'>
                  <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                  <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
               </div>
               <div className='about-project__section'>
                  <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                  <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
               </div>
            </div>
            <div className='about-project__timing'>
               <div className='about-project__backend'>
                  <p className='about-project__backend-timing'>1 неделя</p>
                  <p className='about-project__description'>Back-end</p>
               </div>
               <div className='about-project__frontend'>
                  <p className='about-project__frontend-timing'>4 недели</p>
                  <p className='about-project__description'>Front-end</p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AboutProject;