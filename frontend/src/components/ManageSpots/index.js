import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

import SpotCardImage from '../SpotCardImage'

import './ManageSpots.css'

import ManageSpotsCard from '../SpotCards/ManageSpotsCard';
import ManageButtons from '../ManageButtons'

import { loadUserSpots } from '../../store/spots';
import SpotCards from '../SpotCards';

const ManageSpots = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(loadUserSpots())
  }, [dispatch]) 
  let spots = useSelector(state => state.spots.allSpots);
  // // console.log('----------------spotsspotsspotsspotsspotsspotsspotsspots',spots);
  let allSpots = Object.values(spots);
  // console.log('------------------------------allspots', allSpots);

  return (
    <main >
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Your Spots</h3>
            <button id="manage-button">create a new spot</button>
          </div>
          {
            allSpots.map(spot => {
              return (
                <>
                  <SpotCards spot={spot}></SpotCards>
                  <ManageButtons></ManageButtons>
                </>
              )
            })
          }
        </nav>
      </div>
    </main>
  );
};

export default ManageSpots;