import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './MobileMenu.css';

function MobileMenu({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  return (
    <ul className="mobile-menu">
        <li
        >
            <NavLink
                id="logo-button"
                exact to="/"
            >
                <i class="fas fa-yin-yang"></i>
            </NavLink>
            <NavLink
                id="logo-mobile"
                exact to="/"
            >
                <span className="logo logo-mobile">
                    ShareBnB
                </span>
            </NavLink>
        </li>
        <div
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
                    <div className="nav-item logo-mobile">
                        <ProfileButton user={sessionUser} />
                    </div>
                </li>
            </>
            )
            }
        </div>
    </ul>
  );
}

export default MobileMenu;
