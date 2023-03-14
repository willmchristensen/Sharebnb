import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SpotCardImage.css';
import cabin from '../../images/daniel-j-schwarz-BNX4W2GDjxI-unsplash.jpg'
const SpotCardImage = (spot) => {

  return (
    <>
        <div className="spot-card-image">
              <img src={cabin} alt="" />
          </div>
    </>
  );
};

export default SpotCardImage;