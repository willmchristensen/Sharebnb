import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SpotCardImage from '../SpotCardImage';
import './SpotCards.css';
import './ManageSpots.css'
import ManageButtons from '../ManageButtons'
const ManageSpotsCard = ({ spot }) => {
  const spotImages = useSelector(state => state.spots.singleSpot.SpotImages);

  return (
    <NavLink className="spot-card" key={spot.name} to={`/spots/${spot.id}`}>
      <div className="nav-link">
        <div className="tooltip">
          <div className="tooltip-text">{spot.name}</div>
          <SpotCardImage image={spot.previewImage}></SpotCardImage>
        </div>
        <div className="nav-link-info">
          <div className="nav-link-info primary">
            <h4>{spot.city}, {spot.state}</h4>
            <div
              id="card-stars"
            >
              <i class="fas fa-star"></i>
              {Boolean(spot.avgRating) ? Number(spot.avgRating).toFixed(1) : 'New'}
            </div>
          </div>
          <div className="nav-link-info secondary">
            <span>${spot.price} night</span>
          </div>
        </div>
      </div>
      <ManageButtons spot={spot}/>
    </NavLink>
  );
};

export default ManageSpotsCard;
