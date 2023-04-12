import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function MobileMenu({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="mobile-nav">
        <ul className="mobile-menu">
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
  );
}

export default MobileMenu;
