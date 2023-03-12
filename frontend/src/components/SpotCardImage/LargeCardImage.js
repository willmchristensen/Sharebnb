import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './LargeCardImage.css'
import cabin from '../../images/daniel-j-schwarz-BNX4W2GDjxI-unsplash.jpg'
const LargeCardImage = (spot) => {

  // if (!allSpots) {
  //   return null;
  // }

  return (
    <div className="large-spot-card-image">
        <img src={cabin} alt="" />
    </div>
  );
};

export default LargeCardImage;