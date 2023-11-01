import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import './ManageSpots.css'
import ManageButtons from '../ManageButtons'
import { loadUserSpots,getUserSpots, getEverySpot, getAllSpots} from '../../store/spots';
import SpotCards from '../SpotCards';

const ManageSpots = () => {

  const dispatch = useDispatch();
  // let allSpots = useSelector(getEverySpot);
  // const dispatch = useDispatch();
  // let allSpots = useSelector(getUserSpots);
  // console.log(allSpots)

  // useEffect(() => {
  //   dispatch(loadUserSpots())
  // }, [dispatch]);

  // const dispatch = useDispatch();
  let allSpots = useSelector(getEverySpot);
  let sessionUser = useSelector(state=>state.session.user);
  console.log(sessionUser)
  console.log(allSpots)
  allSpots=allSpots.filter(spot => spot.ownerId === sessionUser.id);
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

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
                id="manage"
              >Create a new spot</button>
            </NavLink>
          </div>
            {
              allSpots.map(spot =>
                <div className="manage-container">
                  <SpotCards
                    spot={spot}
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
