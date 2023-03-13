import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCards from '../SpotCards';
import SpotCardImage from '../SpotCardImage'
import './ManageSpots.css'
import ManageButtons from '../ManageButtons'
// TODO: THUNKS
const ManageSpots = () => {
  // const dispatch = useDispatch(); 
  // useEffect(() => {
  //   dispatch(getAllSpots())
  // }, [dispatch]) 
  // let spots = useSelector(state => state.spots.allSpots);
  // console.log('----------------',spots);
  // let allSpots = Object.values(spots)
  // console.log('----------------',allSpots);

  return (
    // <main >
    //   <nav className="manage-spots-section">
    //     {
    //       allSpots.map(spot => {
    //         return (
    //          <>
    //           <NavLink 
    //           className="spot-card"
    //           key={spot.spot.name}
    //           to={`/spots/${spot.spot.id}`}
    //       >
    //           <div className="nav-link" >
    //               <div className="nav-link-image" >
    //                   <SpotCardImage></SpotCardImage>
    //               </div>
    //               <div className="nav-link-info-primary">
    //                   <h4>city</h4>
    //                   {/* {console.log(Boolean(spot.spot.avgRating))} */}
    //                   <div>
    //                       <i class="fas fa-star"></i>
    //                       avgRating
    //                   </div>
    //               </div>
    //               <div className="nav-link-info-secondary">
    //                   <h4>price</h4> 
    //               </div>
    //           </div>
    //       </NavLink>
    //           <div className="buttons"></div>
    //           </>
    //         )
    //       })
    //     }
    //   </nav>
    // </main>
    // TODO: add these buttons to the cards? 
    <ManageButtons></ManageButtons>
  );
};

export default ManageSpots;