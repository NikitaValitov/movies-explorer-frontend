import { Link } from 'react-router-dom';
import './Login.css'
import { useEffect } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {

   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      onLogin(values)
   }

   useEffect(() => {
      resetForm();
   }, [resetForm]);

   return (
      <div className="login">
         <Link className="login__logo" to="/" />
         <h2 className="login__title">
            Рады видеть!
         </h2>
         <form
            className="login__form"
            onSubmit={handleSubmit}
         >
            <div className='login__labels'>
               <label className='login__label'> E-mail
                  <input
                     className={`${!errors.email ? 'login__input' : 'login__input_error'}`}
                     name="email"
                     type="email"
                     onChange={handleChange}
                     value={values.email || ''}
                     required
                  />
                  <span className='login__error-email'>{errors.email || ''}</span>
               </label>
               <label className='login__label'> Пароль
                  <input
                     className={`${!errors.password ? 'login__input' : 'login__input_error'}`}
                     name="password"
                     type="password"
                     onChange={handleChange}
                     value={values.password || ''}
                     required
                     minLength="6"
                  />
                  <span className='login__error-password'>{errors.password || ''}</span>
               </label>
            </div>

            <button
               className={`${isValid ? 'login__btn' : 'login__btn_disabled'}`}
               disabled={!isValid}
            >
               Войти
            </button>
         </form>
         <div className="login__signin">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__login-link">Регистрация</Link>
         </div>
      </div>
   )
}

export default Login;