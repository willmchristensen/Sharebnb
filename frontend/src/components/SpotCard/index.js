import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';

const SpotCard = (spot) => {

  // if (!allSpots) {
  //   return null;
  // }

  return (
    // <main>
    //   <nav className="spot-cards-section">
    //     {/* <NavLink
    //         key={spot.name}
    //         to={`/spots/${spot.id}`}
    //     >
    //         <div className="nav-link">
    //             <div className="nav-link-image">
    //                 <p>
    //                     {spot.previewImage}
    //                 </p>
    //             </div>
    //             <div className="primary-text">
    //                 {spot.name}
    //             </div>
    //             <div className="secondary-text">
    //                 {spot.price}
    //             </div>
    //         </div>
    //     </NavLink> */}
   
    //   </nav>
    // </main>
    <div className="spot-cards-section">
        <NavLink
                key={spot.name}
                to={`/spots/${spot.id}`}
            >
                <div className="nav-link">
                    <div className="nav-link-image">
                       <SpotCardImage></SpotCardImage>
                    </div>
                    <div className="primary-text">
                        <h4>name</h4>
                    </div>
                    <div className="secondary-text">
                        <h4>price</h4>
                    </div>
                </div>
        </NavLink>
        <NavLink
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <p>
                        <h1></h1>
                    </p>
                </div>
                <div className="primary-text">
                    <h4>name</h4>
                </div>
                <div className="secondary-text">
                    <h4>price</h4>
                </div>
            </div>
        </NavLink>
        <NavLink
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <p>
                        <h1></h1>
                    </p>
                </div>
                <div className="primary-text">
                    <h4>name</h4>
                </div>
                <div className="secondary-text">
                    <h4>price</h4>
                </div>
            </div>
        </NavLink>
        <NavLink
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <p>
                        <h1></h1>
                    </p>
                </div>
                <div className="primary-text">
                    <h4>name</h4>
                </div>
                <div className="secondary-text">
                    <h4>price</h4>
                </div>
            </div>
        </NavLink>
    </div>
  );
};

export default SpotCard;