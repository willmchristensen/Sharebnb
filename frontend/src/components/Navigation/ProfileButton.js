import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { getAllSpots } from '../../store/spots';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [manageSpots,showManageSpots] = useState(false);
  const [manageReviews,showManageReviews] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  const openMenu = () => {
    setShowMenu(!showMenu);
  }
  let spots = useSelector(state => state.spots.allSpots);
  let allSpots = Object.values(spots);
  let reviews = useSelector(state => state.reviews.user);
  let allReviews = Object.values(reviews);
  let User = useSelector(state => state.session.user);
  useEffect(() => {
    if(User){
      let isOwner = allSpots.find(spot => spot.ownerId === User.id);
      let opinionated = allReviews.find(review => review.userId === User.id);
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
   }, [User]);
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
  return (
    <>
      <button
        onClick={openMenu}
        className="profile-menu"
        id="button"
      >
        <i className="fas fa-user-circle" />
      </button>
      <ul
        className={ulClassName}
        ref={ulRef}
      >
        {
          User ? (
            <>
              <li
              >
                Hello, {User.username}
              </li>
              <li>
                {User.email}
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
              {/* TODO: manage bookings edit bookings */}
              <li
                id="manage"
              >
                <NavLink
                  // key={}
                  to={`/bookings/current`}
                  onClick={closeMenu}
                >
                  Manage Bookings
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
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )
        }
      </ul>
    </>
  );
}

export default ProfileButton;
