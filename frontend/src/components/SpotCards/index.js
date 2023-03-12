import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import './SpotCards.css';

const SpotCards = (spot) => {

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
            className="spot-card"
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <SpotCardImage></SpotCardImage>
                </div>
                <div className="nav-link-info-primary">
                    <h4>City, State</h4>
                    <h4>#.#</h4>
                    {/* <div className="nav-link-primary-city-state">
                        <h4>City, State</h4>
                    </div>
                    <div className="nav-link-primary-avg-rating">
                        <h4>#.#</h4>
                    </div> */}
                </div>
                <div className="nav-link-info-secondary">
                    <h4>$123.45 night</h4> 
                </div>
            </div>
        </NavLink>
        <NavLink 
            className="spot-card"
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <SpotCardImage></SpotCardImage>
                </div>
                <div className="nav-link-info-primary">
                    <h4>City, State</h4>
                    <h4>#.#</h4>
                    {/* <div className="nav-link-primary-city-state">
                        <h4>City, State</h4>
                    </div>
                    <div className="nav-link-primary-avg-rating">
                        <h4>#.#</h4>
                    </div> */}
                </div>
                <div className="nav-link-info-secondary">
                    <h4>$123.45 night</h4> 
                </div>
            </div>
        </NavLink>
        <NavLink 
            className="spot-card"
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <SpotCardImage></SpotCardImage>
                </div>
                <div className="nav-link-info-primary">
                    <h4>City, State</h4>
                    <h4>#.#</h4>
                    {/* <div className="nav-link-primary-city-state">
                        <h4>City, State</h4>
                    </div>
                    <div className="nav-link-primary-avg-rating">
                        <h4>#.#</h4>
                    </div> */}
                </div>
                <div className="nav-link-info-secondary">
                    <h4>$123.45 night</h4> 
                </div>
            </div>
        </NavLink>
        <NavLink 
            className="spot-card"
            key={spot.name}
            to={`/spots/${spot.id}`}
        >
            <div className="nav-link">
                <div className="nav-link-image">
                    <SpotCardImage></SpotCardImage>
                </div>
                <div className="nav-link-info-primary">
                    <h4>City, State</h4>
                    <h4>#.#</h4>
                    {/* <div className="nav-link-primary-city-state">
                        <h4>City, State</h4>
                    </div>
                    <div className="nav-link-primary-avg-rating">
                        <h4>#.#</h4>
                    </div> */}
                </div>
                <div className="nav-link-info-secondary">
                    <h4>$123.45 night</h4> 
                </div>
            </div>
        </NavLink>
    </div>
  );
};

export default SpotCards;