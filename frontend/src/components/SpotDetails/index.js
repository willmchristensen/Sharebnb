import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import './SpotDetails.css';

const SpotCards = (spot) => {

  // if (!allSpots) {
  //   return null;
  // }

  return (
    <div className="spot-details-section">
        <div className="spot-details-hero-image">
            <NavLink 
                className="spot-card"
                key={spot.name}
                to={`/spots/${spot.id}`}
            >
                <div className="nav-link">
                    <div className="nav-link-image">
                        <LargeCardImage></LargeCardImage>
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
        <div className="spot-details-images">
            <div className="spot-details-images-cards">
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
        </div>
        <div className="spot-details-info">
            <hr />
            <div className="spot-details-info">
                
            </div>
            <div className="spot-details-info">
                
            </div>
            <div className="spot-details-info">
                
            </div>
        </div>
    </div>
  );
};

export default SpotCards;