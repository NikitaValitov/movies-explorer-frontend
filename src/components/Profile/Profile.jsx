import './Profile.css'

function Profile() {
   return (
      <main className="profile">
         <div className='profile__container'>
            <h2 className='profile__title'>Привет, Виталий!</h2>
            <form className='profile__form'>
               <div className='profile__labels'>
                  <label className='profile__label'> Имя
                     <input
                        type="text"
                        className='profile__input'
                        name='name'
                        placeholder='Имя'
                        defaultValue='Виталий'
                        required
                     />
                  </label>
                  <label className='profile__label'> E-mail
                     <input
                        type="email"
                        className='profile__input'
                        name='email'
                        placeholder='E-mail'
                        defaultValue='pochta@yandex.ru'
                        required
                     />
                  </label>
               </div>

               <button className='profile__btn-edit' type='submit'>Редактировать</button>
            </form>
            <button className='profile__btn-exit'>Выйти из аккаунта</button>

         </div>
      </main>
   )
}

export default Profile;