import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { getAllSpots } from '../../store/spots';

function ProfileDropDown({ user, ulClassName, showMenu,closeMenu,logout }) {
  // FIXME: dynamic class names, pic disappears after click but reappears when user exits the modal etc.... just need more coffee
  const profileClassName = (!showMenu ? "hidden" : "fas fa-user-circle");
  const conditionalContent = (!showMenu ? "hidden" : "conditional-content");
  const userContent = (!user ? "hidden" : "user-content");
  return (
    <>
        {user ?
             <ul
             className={ulClassName}
           >
             <div className={userContent}>
               <li>
                 Hello, {user.username}
               </li>
               <li>
                 {user.email}
               </li>
               <li
                 id="manage"
               >
                 <NavLink
                   // key={}
                   to={`/spots/current`}
                   onClick={closeMenu}
                 >
                   Manage Spots
                 </NavLink>
               </li>
               <li
                 id="manage"
               >
                 <NavLink
                   // key={}
                   to={`/reviews/current`}
                   onClick={closeMenu}
                 >
                   Manage Reviews
                 </NavLink>
               </li>
               <li
                 id="logout"
               >
                 <button
                   onClick={logout}
                   className="logout"
                 >
                   Log Out
                 </button>
               </li>
             </div>
           </ul>
           :
           <div className= {conditionalContent}>
          <OpenModalMenuItem
            itemText="Log In"
            modalComponent={<LoginFormModal />}
          />
          <OpenModalMenuItem
            itemText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
        }
    </>
  );
}

export default ProfileDropDown;
