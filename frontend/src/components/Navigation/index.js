import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
            {/* <div className="nav-item"> */}
              <i class="fas fa-yin-yang"></i>
            {/* </div> */}
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
      <div className="mobile-nav">
        <ul className="baby-menu">
          <li
            id="logo"
            className="nav-bar-conditional-content"
          >
            <NavLink exact to="/">
              {/* <div className="nav-item"> */}
                <i class="fas fa-yin-yang"></i>
              {/* </div> */}
              <span className="logo">
                ShareBnB
              </span>
            </NavLink>
          </li>
          <div
            className="nav-bar-conditional-content"
            id="create-spot-button"
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
                  <div className="nav-item">
                    <ProfileButton user={sessionUser} />
                  </div>
                </li>
              </>
              )
            }
          </div>
        </ul>
      </div>
    </>

  );
}

export default Navigation;
