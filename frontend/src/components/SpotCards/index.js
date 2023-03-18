import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SpotCardImage from '../SpotCardImage';
import './SpotCards.css';

const SpotCards = ({ spot }) => {
  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages);

  return (
    <NavLink className="spot-card" key={spot.name} to={`/spots/${spot.id}`}>
      <div className="nav-link">
        <div className="tooltip-text">{spot.name}</div>
        <div className="nav-link-image">
          <SpotCardImage image={spot.previewImage}></SpotCardImage>
        </div>
        <div className="nav-link-info-primary">
          <h4>{spot.city}</h4>
          <div>
            <i class="fas fa-star"></i>
            {Boolean(spot.avgRating) ? spot.avgRating : 'New'}
          </div>
        </div>
        <div className="nav-link-info-secondary">
          <h4>$ {spot.price}</h4>
        </div>
      </div>
    </NavLink>
  );
};

export default SpotCards;
