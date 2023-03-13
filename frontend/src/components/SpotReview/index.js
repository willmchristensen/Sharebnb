import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import './SpotReview.css';

const SpotReview = ({spot}) => {

    const handleReservation = () => window.alert('Feature in progress');

    // const reviews = spot.reviews;
    // console.log('------------------------------reviews',reviews);
    // console.log('------------------------------spot',spot);
  return (
    <div className="spot-review">
        <h2 className="spot-review-name">
            name
        </h2>
        <h3 className="spot-review-date">
            date
        </h3>
        <p className="spot-review-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, quibusdam.
        </p>
    </div>
  );
};

export default SpotReview;