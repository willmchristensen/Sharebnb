import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-bar">
      <li>
        <NavLink exact to="/">
          <i class="fas fa-yin-yang"></i>
          ShareBnb
        </NavLink>
      </li>
      <div className="nav-bar-conditional-content">
        {
          sessionUser && (
            <>
              <li>
                <NavLink
                  className="spot-card"
                  // key={}
                  to={`/spots/new`}
                >
                  create spot
                </NavLink>
              </li>
            </>
          )
        }
        {
          isLoaded && (
          <>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </>
          )
        }
      </div>
    </ul>
  );
}

export default Navigation;