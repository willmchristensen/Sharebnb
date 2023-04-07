import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [search,setSearch] = useState('');
  const handleChange = ()
  return (
    <ul className="nav-bar">
      <li
        id="logo"
        className="nav-bar-conditional-content"
      >
        <NavLink exact to="/">
          <div className="nav-item">
            <i class="fas fa-yin-yang"></i>
          </div>
          <span className="logo">ShareBnB</span>
        </NavLink>
      </li>
      <li
        id="search"
      >
        <label htmlFor="">
          <input 
          type="text"
          placeholder='find your spot'
          value={search}
          onChange={handleChange(e)}
           />
        </label>
      </li>
      <div className="nav-bar-conditional-content">
        {
          sessionUser && (
            <>
              <li
                id="new-spot"
              >
                <NavLink
                  className
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
  );
}

export default Navigation;