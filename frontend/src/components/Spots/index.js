import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCards from '../SpotCards';
const Spots = () => {
  const dispatch = useDispatch(); 
  let spots = useSelector(state => state.spots.allSpots);
  let allSpots = Object.values(spots)
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]) 
  console.log('spots in allspots-------------------------', spots);
  
  return (
    <main >
      <nav className="spot-cards-section">
        {
          allSpots.map(spot => {
            return (
              <SpotCards 
                spot={spot}
              />
            );
          })
        }
      </nav>
    </main>
  );
};

export default Spots;