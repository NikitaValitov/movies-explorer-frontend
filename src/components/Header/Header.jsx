import './Header.css'
import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation'

function Header({ loggedIn }) {
   const location = useLocation();
   return (
      <header className={`${location.pathname === '/' ? 'header' : 'header__dark'}`}>
         <div className="header__container">
            <Link className="header__logo" to="/" />
            <Navigation loggedIn={loggedIn} />
         </div>
      </header>
   )
}

export default Header;