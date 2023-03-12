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
  let spots = useSelector(state => state.spots);
  let allSpots = Object.values(spots)[0].Spots;
  // console.log(allSpots[0].address);
  // if (!allSpots) {
  //   return null;
  // }

  return (
    <main>
      <nav>
        <SpotCards></SpotCards>
        {/* {allSpots.forEach(element => {
          return (
            <h1>{element.address}</h1>
          )
        })} */}
        {/* <h1>{allSpots[0].address}</h1>
        {/* {allSpots.map(spot => (
          <SpotCards spot={spot}></SpotCards>
        ))} */}
      </nav>
    </main>
  );
};

export default SpotBrowser;