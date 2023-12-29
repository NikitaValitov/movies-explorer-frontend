import { Link } from 'react-router-dom';
import './Login.css'

function Login() {
   return (
      <div className="login">
         <Link className="login__logo" to="/" />
         <h2 className="login__title">
            Добро пожаловать!
         </h2>
         <form
            className="login__form"
         >
            <div className='login__labels'>
               <label className='login__label'> E-mail
                  <input
                     className="login__input"
                     name="email"
                     type="email"
                  />
               </label>
               <label className='login__label'> Пароль
                  <input
                     className="login__input"
                     name="password"
                     type="password"
                  />
               </label>
            </div>

            <button
               type="submit"
               className="login__btn"
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