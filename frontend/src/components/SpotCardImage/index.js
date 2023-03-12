import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SpotCardImage.css';
import cabin from '../../images/daniel-j-schwarz-BNX4W2GDjxI-unsplash.jpg'
const SpotCardImage = (spot) => {

  // if (!allSpots) {
  //   return null;
  // }

  return (
    <>
        <div className="spot-card-image">
            <img src={cabin} alt="" />
            <p className="tooltip">tooltip</p>
        </div>
    </>
  );
};

export default SpotCardImage;