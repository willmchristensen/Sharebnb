import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCards from '../SpotCards';
const SpotBrowser = () => {
  // FIXME: spots persist?
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]) 
  let spots = useSelector(state => state.spots.allSpots);
  console.log('----------------',spots);
  let allSpots = Object.values(spots)
  console.log('----------------',allSpots);

  return (
    <main >
      <nav className="spot-cards-section">
        {
          allSpots.map(spot => {
            return (
              <SpotCards spot={spot}></SpotCards>
            )
          })
        }
      </nav>
    </main>
  );
};

export default SpotBrowser;