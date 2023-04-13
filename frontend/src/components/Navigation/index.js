import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import MobileMenu from './MobileMenu';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <ul className="nav-bar">
        <li
          id="logo"
          className="nav-bar-conditional-content"
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
        <div
          className="nav-bar-conditional-content"
          id="profile-bruh"
        >
          {
            sessionUser && (
              <>
                <li
                  id="new-spot"
                >
                  <NavLink
                    to={`/spots/new`}
                  >
                    Create A New Spot
                  </NavLink>
                </li>
              </>
            )
          }
          {
            isLoaded && (
            <>
              <li
                id="profile"
              >
                <ProfileButton user={sessionUser} />
              </li>
            </>
            )
          }
        </div>
      </ul>
      <MobileMenu isLoaded={isLoaded}/>
    </>

  );
}

export default Navigation;
