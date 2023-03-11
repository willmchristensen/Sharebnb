import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';

const SpotCardImage = (spot) => {

  // if (!allSpots) {
  //   return null;
  // }

  return (
    <div className="spot-card-image">
        <img src={`placeholder`} alt="" />
        <p>img</p>
    </div>
  );
};

export default SpotCardImage;