import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import './SpotCards.css';
// TODO: TOOLTIP!!!!!!!!!!!!!!!!
const SpotCards = ({spot}) => {

  return (
    <NavLink 
        className="spot-card"
        key={spot.name}
        to={`/spots/${spot.id}`}
    >
        <div className="nav-link" >
            <div className="tooltip-text">
                TOOLTIP
                {/* <span className="tool">TOOLTIP</span> */}
            </div>
            <div className="nav-link-image" >
                <SpotCardImage></SpotCardImage>
            </div>
            <div className="nav-link-info-primary">
                <h4>{spot.city}</h4>
                {/* {console.log(Boolean(spot.spot.avgRating))} */}
                <div>
                    <i class="fas fa-star"></i>
                    {Boolean(spot.avgRating) ?  spot.avgRating : '#.#'}
                </div>
            </div>
            <div className="nav-link-info-secondary">
                <h4>{spot.price}</h4> 
            </div>
        </div>
    </NavLink>
  );
};

export default SpotCards;