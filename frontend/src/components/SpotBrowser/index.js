import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

const SpotBrowser = () => {
  const allSpots = useSelector(state => state.spots.spots);
  console.log(allSpots)
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch]) 

  // if (!allSpots) {
  //   return null;
  // }

  return (
    <main>
      <nav>
         {/* {spots.map((spot) => {
          return (
            <NavLink key={spot.name} to={`/spots/${spot.id}`}>
              <div
                className='nav-link'
              >
                <div
                  className="nav-link-image"
                  style={{ backgroundImage: `url('${spot.previewImage}')` }}
                ></div>
                <div>
                  <div className="primary-text">{spot.name}</div>
                  <div className="secondary-text">
                    ${spot.price}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })} */}
      </nav>
    </main>
  );
};

export default SpotBrowser;