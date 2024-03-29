import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots, getEverySpot } from '../../store/spots';
import SpotCards from '../SpotCards';
const Spots = () => {
  const dispatch = useDispatch();
  let allSpots = useSelector(getEverySpot);
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])
  return (
    <main >
      <nav className="spot-cards-section">
          {
            allSpots.map(spot => {
              return (
                <SpotCards
                  spot={spot}
                  className="spot-card"
                />
              );
            })
          }
      </nav>
    </main>
  );
};

export default Spots;
