import { Link } from 'react-router-dom';
import './Register.css'
import { useEffect } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register({ onRegister }) {

   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      onRegister(values)
   }

   useEffect(() => {
      resetForm();
   }, [resetForm]);

   return (
      <div className="register">
         <Link className="register__logo" to="/" />
         <h2 className="register__title">
            Добро пожаловать!
         </h2>
         <form
            className="register__form"
            onSubmit={handleSubmit}
         >
            <div className='register__labels'>
               <label className='register__label'> Имя
                  <input
                     className={`${!errors.name ? 'register__input' : 'register__input_error'}`}
                     name="name"
                     type="text"
                     onChange={handleChange}
                     value={values.name || ''}
                     required
                     minLength="2"
                     pattern={'^[а-яА-Яa-zA-Z0-9]+$'}
                  />
                  <span className='register__error-name'>{errors.name || ''}</span>
               </label>
               <label className='register__label'> E-mail
                  <input
                     className={`${!errors.email ? 'register__input' : 'register__input_error'}`}
                     name="email"
                     type="email"
                     onChange={handleChange}
                     value={values.email || ''}
                     required
                  />
                  <span className='register__error-email'>{errors.email || ''}</span>
               </label>
               <label className='register__label'> Пароль
                  <input
                     className={`${!errors.password ? 'register__input' : 'register__input_error'}`}
                     name="password"
                     type="password"
                     onChange={handleChange}
                     value={values.password || ''}
                     required
                     minLength="6"
                  />
                  <span className='register__error-password'>{errors.password || ''}</span>
               </label>
            </div>

            <button
               type="submit"
               className={`${isValid ? 'register__btn' : 'register__btn_disabled'}`}
               disabled={!isValid}
            >
               Зарегистрироваться
            </button>
         </form>
         <div className="register__signin">
            <p className="register__text">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__login-link">Войти</Link>
         </div>
      </div>
   )
}

export default Register;