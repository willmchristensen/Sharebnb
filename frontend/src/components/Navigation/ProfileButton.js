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

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  let spots = useSelector(state => state.spots.allSpots);
  let allSpots = Object.values(spots);
  let reviews = useSelector(state => state.reviews.user);
  let allReviews = Object.values(reviews);
  // console.log('------------------------------allSpots',allSpots);
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

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]);

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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user && manageSpots && manageReviews ? (
          <>
            <li>
              <NavLink
                // key={}
                to={`/spots/current`}
              >
                Manage Spots
              </NavLink>
            </li>
            <li>
              <NavLink
                // key={}
                to={`/reviews/current`}
              >
                Manage Reviews
              </NavLink>
            </li>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : user  && manageSpots ? (
          <> 
            <li>
              <NavLink
                // key={}
                to={`/spots/current`}
              >
                Manage Spots
              </NavLink>
            </li>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : user  && manageReviews ?(
          <> 
            <li>
              <NavLink
                // key={}
                to={`/reviews/current`}
              >
                Manage Reviews
              </NavLink>
            </li>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : user ? (
          <> 
            <li>{user.username}</li>
              <li>{user.firstName} {user.lastName}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;