import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import './SpotReview.css';

const SpotReview = ({review}) => {

    const handleReservation = () => window.alert('Feature in progress');
    // const reviews = spot.reviews;
    // console.log('------------------------------reviews',reviews);
    // console.log('------------------------------spot',spot);

    let date = new Date(review.createdAt);
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let monthNum = date.getMonth();
    let month = months[monthNum - 1];
    let year = date.getFullYear();

  return (
    <div className="spot-review">
        <h3 className="spot-review-name">
            {review.User.firstName} {review.User.lastName}
        </h3>
        <h3 className="spot-review-date">
            {month} {year}
        </h3>
        <p className="spot-review-description">
            {review.review}
        </p>
    </div>
  );
};

export default SpotReview;