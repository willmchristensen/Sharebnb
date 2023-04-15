import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MobileProfileButton from './MobileProfileButton';
import './MobileMenu.css';
function MobileMenu({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [minimenu,showminimenu] = useState(false);
  const [logo,hideLogo] = useState(true);
  const yinYang = ( logo? "fas fa-yin-yang" : 'hidden');
  const miniContent = ( minimenu? 'nav-bar-conditional-content mobile': 'hidden');
  return (
    <ul className="mobile-menu">
        <li
            className="nav-bar-conditional-content mobile"
        >
            <NavLink
                id="logo-mobile"
                onClick={() => showminimenu(!minimenu)}
                exact to="/"
            >
                <i class={yinYang}></i>
            </NavLink>
        </li>
        <div
            className={miniContent}
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
                        <MobileProfileButton
                            logo={logo}
                            hideLogo={hideLogo}
                        >
                        </MobileProfileButton>
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
