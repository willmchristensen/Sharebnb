import {useSelector} from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import SpotCardImage from '../SpotCardImage';
import './SpotCards.css';

const SpotCards = ({spot}) => {
    
    console.log('------------------------------spot',spot);

  return (
    <NavLink 
        className="spot-card"
        key={spot.name}
        to={`/spots/${spot.id}`}
    >
        <div className="nav-link" >
            <div className="tooltip-text">
                TOOLTIP
            </div>
            <div className="nav-link-image" >
                <SpotCardImage 
                    // image={spotImages[0]}
                    spot={spot}
                ></SpotCardImage>
            </div>
            <div className="nav-link-info-primary">
                <h4>{spot.city}</h4>
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