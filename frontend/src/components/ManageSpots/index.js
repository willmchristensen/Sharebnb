import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCards from '../SpotCards';
import SpotCardImage from '../SpotCardImage'
import './ManageSpots.css'
import ManageButtons from '../ManageButtons'
import { loadUserSpots } from '../../store/spots';
// TODO: THUNKS
const ManageSpots = ({user}) => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(loadUserSpots())
  }, [dispatch]) 
  let spots = useSelector(state => state.spots.allSpots);
  console.log('----------------spotsspotsspotsspotsspotsspotsspotsspots',spots);
  let allSpots = Object.values(spots);
  // let allSpots = Object.values(spots)
  // console.log('----------------',allSpots);

  return (
    <main >
      <nav className="manage-spots-section">
        {
          allSpots.map(spot => {
            return (
             <>
              <NavLink 
                className="spot-card"
                key={spot.name}
                to={`/spots/${spot.id}`}
              >
                <div className="nav-link" >
                    <div className="nav-link-image" >
                        <SpotCardImage></SpotCardImage>
                    </div>
                    <div className="nav-link-info-primary">
                      {console.log({spot})}
                        <h4>city?</h4>
                        {/* {console.log(Boolean(spot.spot.avgRating))} */}
                        <div>
                            <i class="fas fa-star"></i>
                            avgRating
                        </div>
                    </div>
                    <div className="nav-link-info-secondary">
                        <h4>price</h4> 
                    </div>
                </div>
              </NavLink>
              <div className="buttons"></div>
              </>
            )
          })
        }
      <ManageButtons></ManageButtons>
      </nav>
    </main>
  );
};

export default ManageSpots;