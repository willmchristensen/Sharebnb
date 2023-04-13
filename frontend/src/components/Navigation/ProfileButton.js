import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { getAllSpots } from '../../store/spots';

function ProfileButton({ user }) {
  // ---------------------state---------------------
  const [manageSpots,showManageSpots] = useState(false);
  const [manageReviews,showManageReviews] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // ---------------------state---------------------
  const dispatch = useDispatch();
  const ulRef = useRef();
  const history = useHistory();
  const openMenu = () => {
    setShowMenu(!showMenu);
  }
  // ---------------------data---------------------
  let spots = useSelector(state => state.spots.allSpots);
  let allSpots = Object.values(spots);
  let reviews = useSelector(state => state.reviews.user);
  let allReviews = Object.values(reviews);
  // ---------------------data---------------------
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
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
    closeMenu();
  };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // FIXME: dynamic class names, pic disappears after click but reappears when user exits the modal etc.... just need more coffee
  // const profileClassName = (showMenu ? "hidden" : "fas fa-user-circle");
  const conditionalContent = (showMenu ? "hidden" : "conditional-content");
  const userContent = (!user ? "hidden" : "user-content");
  return (
    <>
      <button
        onClick={openMenu}
        className="profile-menu"
      >
        <i className="fas fa-user-circle"/>
      </button>
      { user ?
        <ul
          className={ulClassName}
          ref={ulRef}
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
        <div className={conditionalContent}>
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

export default ProfileButton;
