import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import './MobileMenu.css';

function MobileMenu({ isLoaded }){
    const [profileButton, hideProfileButton] = useState(false);
    const profileButtonView = (profileButton ? 'nav-item' : 'hidden');
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const handleClick = () => {
    history.push('/')
  }
//   const handleProfileClick = () => {
//     hideProfileButton(!profileButton)
//   }
  return (
    <ul className="mobile-menu">
        <li
            className="nav-bar-conditional-content mobile"
        >
            <button
                id="button"
                onClick={handleClick}
            >
                <i class="fas fa-yin-yang"></i>
            </button>
            <NavLink
                id="logo-mobile"
                exact to="/"
            >
                <span className="logo">
                    ShareBnB
                </span>
            </NavLink>
        </li>
        <div
            className="nav-bar-conditional-content mobile"
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
                        <ProfileButton
                            user={sessionUser}
                            // onClick={handleProfileClick}
                        />
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
