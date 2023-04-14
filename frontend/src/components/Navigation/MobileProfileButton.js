import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './MobileMenu.css'

function MobileProfileButton({ user }) {
  // ---------------------state---------------------
  const [manageSpots,showManageSpots] = useState(false);
  const [manageReviews,showManageReviews] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [hidden, setHidden] = useState(false);

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
    if (!showMobileMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        showMobileMenu(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMobileMenu]);
  const closeMenu = () => showMobileMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
    closeMenu();
  };
  const handleMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
    setHidden(!hidden);
  }
  const ulClassName =  (showMobileMenu ? "profile-dropdown-mobile" : " hidden");
  const mobileUserIcon = (!showMobileMenu ? "hidden" : "fas fa-user-circle");
  const mobileConditionalContent = (showMobileMenu ? "hidden" : "conditional-content-mobile");

  return (
    <>
      <button
        onClick={handleMenuClick}
        className={profileMenu}
      >
        <i className={mobileUserIcon}/>
      </button>
      <ul
        className={ulClassName}
        ref={ulRef}
      >
        {
          user ? (
            <div className="user-info-mobile">
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
            </div>
          ) : (
            <div className={mobileConditionalContent}>
              <OpenModalMenuItem
                itemText="Log In"
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
          )
        }
      </ul>
    </>
  );
}

export default MobileProfileButton;
