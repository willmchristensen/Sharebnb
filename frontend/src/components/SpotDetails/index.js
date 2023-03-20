import { useEffect,useState,useRef } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import { NavLink, Route, useParams} from 'react-router-dom';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import SpotReview from '../SpotReview';
import { loadSpotDetails } from '../../store/spots';
import {loadSpotReviews} from '../../store/reviews';
import PostAReviewModal from '../PostAReviewModal/index';
import OpenModalMenuItem from '../OpenModalButton';
import './SpotDetails.css';

const SpotDetails = () => {
    // ---------------data------------------
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const spotImages = spot.SpotImages;
    const previewImage = spot.SpotImages[0];
    const reviews = useSelector(state => state.reviews.spot);
    const allReviews = Object.values(reviews);
    const sessionUser = useSelector(state => state.session.user);
    // ---------------data------------------
    const handleReservation = () => window.alert('Feature in progress');
    useEffect(() => {
        dispatch(loadSpotDetails(spotId));
    }, [dispatch,spotId,reviews])
    useEffect(() => {
        dispatch(loadSpotReviews(spotId));
    }, [dispatch,spotId])
    if(!previewImage) return null;
  return (
    <div className="spot-details">
        <div className="spot-details-header">
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        </div>
        <div className="spot-details-images">
            <div className="spot-details-images-hero">
                <NavLink 
                    className="spot-card"
                    key={spot.name}
                    to={`/spots/${spot.id}`}
                >
                    <div className="nav-link">
                        <div className="nav-link-image">
                            <LargeCardImage image={previewImage}>
                            </LargeCardImage>
                        </div>
                    </div>
                </NavLink>
            </div>
            {
                spotImages.length > 1 && (
                    <div className="spot-details-images-support">
                        {spotImages.map((image) =>
                            <SpotCardImage image={image.url}/>
                        )}
                    </div>
                )
            }
        </div>
        <div className="spot-details-section">
            <div className="spot-details-info">
                <div className="spot-details-info-section-one">
                    <div className="spot-details-info-title">
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    </div>
                    <div className="spot-details-info-description">
                        <p>
                            {spot.description}
                        </p>
                    </div>
                </div>
                <div className="spot-details-info-reserve">
                    <div className="spot-details-info-reserve-info">
                        <div className="spot-details-info-reserve-price">
                            <h3>${spot.price} per night</h3>
                        </div>
                        <div className="spot-details-info-reserve-reviews-stars">
                        <div className="spot-details-reviews-content-stars">
                            <i class="fas fa-star"></i>
                            <h3>{Number(spot.avgStarRating).toFixed(1)}</h3>
                            {
                                spot.numReviews > 0 &&
                                <div className="dot">
                                    <i class="fas fa-dot-circle" id="dot"></i>
                                </div>
                            }
                        </div>
                            {
                                spot.numReviews === 1 ? 
                                (
                                    <h3>
                                        {Number(spot.numReviews).toFixed(0)} review
                                    </h3> 
                                ) : spot.numReviews > 0 ? 
                                (
                                    <h3>
                                        {Number(spot.numReviews).toFixed(0)} reviews
                                    </h3> 
                                ) : 
                                (
                                    <h3>
                                        "New"
                                    </h3>
                                )
                            }
                        </div>
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
                <h3>{Number(spot.avgStarRating).toFixed(1)}</h3>
                {
                    spot.numReviews > 0 &&
                    <div className="dot">
                        <i class="fas fa-dot-circle" id="dot"></i>
                    </div>
                }
            </div>
            <div className="spot-details-reviews-content-reviews">
                {
                    spot.numReviews === 1 ? 
                    (
                        <h3>
                            {Number(spot.numReviews).toFixed(0)} review
                        </h3> 
                    ) : spot.numReviews > 0 ? 
                    (
                        <h3>
                            {Number(spot.numReviews).toFixed(0)} reviews
                        </h3> 
                    ) : 
                    (
                        <h3>
                            "New"
                        </h3>
                    )
                }
            </div>
        </div>
    </div>
    { sessionUser && !allReviews.find(rev => rev.userId === sessionUser.id) && spot.ownerId !== sessionUser.id &&
        (
            <div className="post-review">
                <div className="modal-material">
                    <OpenModalMenuItem
                        buttonText="Post Your Review"
                        modalComponent={<PostAReviewModal spot={spot}/>}
                    />
                </div>
            </div>
        )
    }
    </div>
        {
            spot.numReviews === 0 ? 
            (
                <h3>
                    "Post Your Review!"
                </h3> 
            ): (
                allReviews.map(rev => <SpotReview review={rev}/>)
            )
        }
    </div>
  );
};

export default SpotDetails;