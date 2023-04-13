import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import MobileMenu from './MobileMenu';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const newSpot = (sessionUser ? "new-spot" : "hidden");
  return (
    <>
      <ul className="nav-bar">
        <li
          id="logo"
        >
          <NavLink exact to="/">
            <button className="logo-button">
              <i class="fas fa-yin-yang"></i>
            </button>
            <span className="logo">
              ShareBnB
            </span>
          </NavLink>
        </li>
        <div className="nav-right">
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
        <ProfileButton user={sessionUser} />
      </ul>
      <MobileMenu isLoaded={isLoaded} />
    </>

  );
}

export default Navigation;
