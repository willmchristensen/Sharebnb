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

  const userId = useSelector(state=> state.session.user.id);
  const spots = useSelector(state=> state.spots);
  console.log('------------------------------spots',spots);

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