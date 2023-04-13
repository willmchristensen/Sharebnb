import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormPage from "../SignupFormModal";

function Menu({ user }) {
  // ---------------------state---------------------
  const [manageSpots,showManageSpots] = useState(false);
  const [manageReviews,showManageReviews] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // ---------------------state---------------------
  const dispatch = useDispatch();
  const ulRef = useRef();
  const history = useHistory();
  // ---------------------data---------------------
  let spots = useSelector(state => state.spots.allSpots);
  let allSpots = Object.values(spots);
  let reviews = useSelector(state => state.reviews.user);
  let allReviews = Object.values(reviews);
  // ---------------------data---------------------
  //---------------------MENU---------------------
  useEffect(() => {
    if(user){
      let isOwner = allSpots.find(spot => spot.ownerId === user.id);
      let opinionated = allReviews.find(review => review.userId === user.id);
      if(isOwner){
        showManageSpots(true);
      }else if(!isOwner){
        showManageSpots(false);
      }else if(opinionated){
        showManageReviews(true);
      }else{
        showManageReviews(false);
      }
    }
   }, [user]);
  //  if user clicks out of profileButton component (useRef()), hideMenu
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);
//   const openMenu = () => {
//     setShowMenu(!showMenu);
//   }
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
    closeMenu();
  };
  // ---------------------MENU---------------------
  // ------------DYNAMIC CLASS NAMES-------------
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // ------------DYNAMIC CLASS NAMES-------------
  return (
    <>
      <div className="create-spot-with-menu">
          <NavLink
          to={`/spots/new`}
        >
          Create A New Spot
        </NavLink>
      </div>
      <div
          className="MENU"
      >
        <ul
          className={ulClassName}
          ref={ulRef}
        >
          {
            user ? (
              <>
                <li
                >
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
              </>
            ) : (
              <>
                <div className="conditional-content">
                  <OpenModalMenuItem
                    itemText="Log In"
                    modalComponent={<LoginFormModal />}
                  />
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    modalComponent={<SignupFormPage />}
                  />
                </div>
              </>
            )
          }
        </ul>
      </div>
    </>
  );
}

export default Menu;
