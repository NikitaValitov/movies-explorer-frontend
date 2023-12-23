import { Link } from 'react-router-dom';
import './Register.css'

function Register() {
   return (
      <div className="register">
         <Link className="register__logo" to="/" />
         <h2 className="register__title">
            Добро пожаловать!
         </h2>
         <form
            className="register__form"
         >
            <div className='register__labels'>
               <label className='register__label'> Имя
                  <input
                     className="register__input"
                     name="name"
                     type="text"
                  />
               </label>
               <label className='register__label'> E-mail
                  <input
                     className="register__input"
                     name="email"
                     type="email"
                  />
               </label>
               <label className='register__label'> Пароль
                  <input
                     className="register__input"
                     name="password"
                     type="password"
                  />
               </label>
            </div>

            <button
               type="submit"
               className="register__btn"
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