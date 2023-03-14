import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage'
import ManageButtons from '../ManageButtons'
import { loadUserSpots } from '../../store/spots';

const ManageSpotsCard = ({spot}) => {
  let rating = spot.avgRating;
  const avgRating = Boolean(rating) ?  rating : '#.#';
  return (
    <div className="manage-card">
      <NavLink 
        className="spot-card"
        key={spot.name}
        to={`/spots/${spot.id}`}
      >
      <div className="nav-link" >
        <div className="nav-link-image" >
            <SpotCardImage></SpotCardImage>
        </div>
        <div className="nav-link-info-primary">
            <h4>{spot.city}</h4>
            <div>
                <i class="fas fa-star"></i>
                {avgRating}
            </div>
        </div>
        <div className="nav-link-info-secondary">
            <h4>{spot.price}</h4> 
        </div>
      </div>
      </NavLink>
      <ManageButtons>
      </ManageButtons>
   </div>
  );
};

export default ManageSpotsCard;