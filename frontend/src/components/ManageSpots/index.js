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
  let spots = Object.values(useSelector(state => state.spots.allSpots));
  console.log('----------------spotsspotsspotsspotsspotsspotsspotsspots',spots);
  let user = useSelector(state => state.session.user);
  console.log('------------------------------user', user);
  let allSpots = spots.find(spot => spot.ownerId === user.id);
  console.log('------------------------------allSpots', allSpots);
  let allSpotsArray = Object.values(allSpots)
  console.log('------------------------------ARRAY', typeof allSpots);

  // return (
  //   <main >
  //     <div className="manage-wrapper">
  //       <nav className="spot-cards-section">
  //         <div className="spot-cards-section-header">
  //           <h3>Manage Your Spots</h3>
  //           <NavLink
  //             className="spot-card"
  //             to={`/spots/new`}
  //           >
  //             <button id="manage-button">create a new spot</button>
  //           </NavLink>
  //         </div>
  //         {
  //           allSpotsArray.map(spot => {
  //             return (
  //               <>
  //                 <SpotCards spot={spot}></SpotCards>
  //                 <ManageButtons spot={spot}></ManageButtons>
  //               </>
  //             )
  //           })
  //         }
  //       </nav>
  //     </div>
  //   </main>
  // );
};

export default ManageSpots;