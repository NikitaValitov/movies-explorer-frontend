import { useEffect, useContext, useState } from 'react';
import './Profile.css'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile({ logOut, updateUser }) {

   const [isUpdate, setIsUpdate] = useState(false);

   const currentUser = useContext(CurrentUserContext);

   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
      name: currentUser.name,
      email: currentUser.email,
   });

   const openUpdate = (e) => {
      e.preventDefault();
      setIsUpdate(true);
   };

   function handleSubmit(e) {
      e.preventDefault();
      updateUser(values);
      setIsUpdate(false);
   }

   useEffect(() => {
      if (currentUser) {
         resetForm(currentUser, {}, true);
      }
   }, [currentUser, resetForm]);

   const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

   return (
      <main className="profile">
         <div className='profile__container'>
            <h2 className='profile__title'>{`Привет, ${currentUser.name || ''}!`}</h2>

            {isUpdate ? (
               <form className='profile__form' onSubmit={handleSubmit}>
                  <div className='profile__labels'>
                     <label className='profile__label'> Имя
                        <input
                           type="text"
                           className={`profile__input ${errors.name && 'profile__input_error'}`}
                           onChange={handleChange}
                           name='name'
                           placeholder='Имя'
                           value={values.name || ''}
                           required
                           minLength="2"
                           pattern={'^[а-яА-Яa-zA-Z0-9]+$'}
              maxLength="30"
                        />
                        <span className='profile__error-name'>{errors.name || ''}</span>
                     </label>
                     <label className='profile__label'> E-mail
                        <input
                           type="email"
                           className={`profile__input ${errors.email && 'profile__input_error'}`}
                           onChange={handleChange}
                           name='email'
                           placeholder='E-mail'
                           value={values.email || ''}
                           required
                        />
                        <span className='profile__error-email'>{errors.email || ''}</span>
                     </label>
                  </div>
                  <button className={`${requirementValidity ? 'profile__btn-save_disabled' : 'profile__btn-save'}`} type='submit' disabled={requirementValidity}>Сохранить</button>
               </form>
            ) : (
               <form className='profile__form' onSubmit={handleSubmit}>
                  <div className='profile__labels'>
                     <label className='profile__label'> Имя
                        <input
                           type="text"
                           className='profile__input'
                           onChange={handleChange}
                           name='name'
                           placeholder='Имя'
                           value={values.name || ''}
                           disabled
                        />
                     </label>
                     <label className='profile__label'> E-mail
                        <input
                           type="email"
                           className='profile__input'
                           onChange={handleChange}
                           name='email'
                           placeholder='E-mail'
                           value={values.email || ''}
                           disabled
                        />
                     </label>
                  </div>
                  <button className='profile__btn-edit' type='submit' onClick={openUpdate}>Редактировать</button>
               </form>
            )}
            {isUpdate ? ('') : (<button className='profile__btn-exit' onClick={logOut}>Выйти из аккаунта</button>)}
         </div>
      </main>
   )
}

export default Profile;