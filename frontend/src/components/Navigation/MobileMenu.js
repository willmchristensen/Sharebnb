import React, {useState}  from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './MobileMenu.css';
import MobileProfileButton from './MobileProfileButton';

function MobileMenu({sessionUser, newSpot}){
    const [showMobileMenu,setShowMobileMenu] = useState(false);
    const handleClick = (e) => {

    }
    const mobileMenu = (showMobileMenu ? 'mobile-menu-items' : 'hidden')
  return (
    <ul className="mobile-menu">
        <li
          id="logo"
        >
          <NavLink
            exact to="/"
            onClick={handleClick}
          >
            <button className="logo-button">
              <i class="fas fa-yin-yang"></i>
            </button>
            <span className="logo">
              ShareBnB
            </span>
            <MobileProfileButton user={sessionUser} />
          </NavLink>
        </li>
        <div className={mobileMenu}>
          <li
            className={newSpot}
          >
            <NavLink
              to={`/spots/new`}
            >
              Create A New Spot
            </NavLink>
          </li>
        </div>
    </ul>
  );
}

export default MobileMenu;
