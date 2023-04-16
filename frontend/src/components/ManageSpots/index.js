import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import './ManageSpots.css'
import ManageButtons from '../ManageButtons'
import { loadUserSpots } from '../../store/spots';
import SpotCards from '../SpotCards';
import { getAllSpots, getEverySpot } from '../../store/spots';

const ManageSpots = () => {
  const dispatch = useDispatch();
  let allSpots = useSelector(getEverySpot);
  console.log(allSpots)
  // const dispatch = useDispatch();
  // const spots = useSelector(state=> state.spots.allSpots);
  // const allSpots = Object.values(spots);

  useEffect(() => {
    dispatch(loadUserSpots())
  }, [dispatch]);


  return (
    <main>
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Spots</h3>
            <NavLink
              className="spot-card"
              to={`/spots/new`}
            >
              <button
                className="create-button manage"
              >Create a new spot</button>
            </NavLink>
          </div>
            {
              allSpots.map(spot =>
                <div className="manage-container">
                  <SpotCards
                    spot={spot}
                    previewImage={spot.previewImage}
                    className="spot-card"
                  />
                  <ManageButtons spot={spot}/>
                </div>
              )
            }
        </nav>
      </div>
    </main>
  );
};

export default ManageSpots;
