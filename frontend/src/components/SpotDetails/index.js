import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams} from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import SpotReview from '../SpotReview';
import { loadSpotDetails } from '../../store/spots';
import {loadSpotReviews} from '../../store/reviews'

import './SpotDetails.css';

const SpotCards = () => {
    // TODO: ROUTEPARAMS
    // const {spotId} = useParams();
    // console.log(spotId)
    const spotId = 3;
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot);
    const allReviews = Object.values(reviews);
    // console.log('------------------------------allReviews',allReviews);
    // console.log('--------------------------------------------------spotINDEX', spot);
    const handleReservation = () => window.alert('Feature in progress');
  // if (!allSpots) {
  //   return null;
  // }
    useEffect(() => {
        dispatch(loadSpotDetails(spotId));
        dispatch(loadSpotReviews(spotId));
    }, [spotId])
    
  return (
    <>
        <div className="spot-details-images">
            <div className="spot-details-images-hero">
                <NavLink 
                    className="spot-card"
                    key={spot.name}
                    to={`/spots/${spot.id}`}
                >
                    <div className="nav-link">
                        <div className="nav-link-image">
                            <LargeCardImage spot={spot}></LargeCardImage>
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className="spot-details-images-support">
                <div className="spot-details-images-support-cards">
                    <NavLink 
                        className="spot-card"
                        key={spot.name}
                        to={`/spots/${spot.id}`}
                    >
                        <div className="nav-link">
                            <div className="nav-link-image" id="bruh">
                                <SpotCardImage></SpotCardImage>
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
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
        <div className="spot-details-section">
            <div className="spot-details-info">
                <hr />
                <div className="spot-details-info-title">
                    <h2>{spot.address}</h2>
                </div>
                <div className="spot-details-info-description">
                    <p>
                        {spot.description}
                    </p>
                </div>
                <div className="spot-details-info-reserve">
                    <div className="spot-details-info-reserve-reviews-stars">
                        <h3>{spot.avgStarRating}</h3>
                        <h3>{spot.numReviews}  review(s)</h3>
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
        <div className="spot-details-reviews-content">
            <div className="spot-details-reviews-content-stars">
                <i class="fas fa-star"></i>
                <h3>{spot.avgStarRating}</h3>
            </div>
            <div className="spot-details-reviews-content-reviews">
                <h3>{spot.numReviews}  review(s)</h3>
            </div>
        </div>
        </div>
            {
                allReviews.map(review => {
                    return (
                        <SpotReview review={review}></SpotReview>
                    );
                })
            }
        </div>
    </>
  );
};

export default SpotCards;