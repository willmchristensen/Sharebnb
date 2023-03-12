import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import SpotReview from '../SpotReview';
import './SpotDetails.css';

const SpotCards = (spot) => {

    const handleReservation = () => window.alert('Feature in progress');
  // if (!allSpots) {
  //   return null;
  // }

  return (
    <>
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
                <div className="spot-details-info-title">
                    <h2>Description/Address/Name</h2>
                </div>
                <div className="spot-details-info-description">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos voluptates quod reiciendis deleniti aperiam tempora, dignissimos modi in adipisci, ullam tempore, ea consectetur? Reprehenderit, ipsa?
                    </p>
                </div>
                <div className="spot-details-info-reserve">
                    <div className="spot-details-info-reserve-reviews-stars">
                        <h3>#.#</h3>
                        <h3># reviews</h3>
                    </div>
                    <div className="spot-details-info-reserve-button">
                        <button 
                            className="reserve-spot"
                            onClick={handleReservation}
                        >
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
            <div className="spot-details-reviews">
                <div className="spot-details-reviews-stars">
                    <h3>#.#</h3>
                    <h3># reviews</h3>
                </div>
            </div>
        </div>
        <SpotReview></SpotReview>
    </>
  );
};

export default SpotCards;