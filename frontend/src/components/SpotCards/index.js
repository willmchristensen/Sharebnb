import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import './SpotCards.css';

const SpotCards = (spot) => {
  return (
    <NavLink 
        className="spot-card"
        key={spot.spot.name}
        to={`/spots/${spot.spot.id}`}
    >
        <div className="nav-link">
            <div className="nav-link-image">
                <SpotCardImage></SpotCardImage>
            </div>
            <div className="nav-link-info-primary">
                <h4>{spot.spot.city}</h4>
                <h4>#.#</h4>
            </div>
            <div className="nav-link-info-secondary">
                <h4>{spot.spot.price}</h4> 
            </div>
        </div>
    </NavLink>
  );
};

export default SpotCards;