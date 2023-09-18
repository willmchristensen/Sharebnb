import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink, useParams, useHistory} from 'react-router-dom';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import SpotReview from '../SpotReview';
import { loadSpotDetails, getSpotDetails } from '../../store/spots';
import {loadSpotReviews} from '../../store/reviews';
import PostAReviewModal from '../PostAReviewModal/index';
import OpenModalMenuItem from '../OpenModalButton';
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const history = useHistory();
    // ----------------------data: memoization------- ------------------
    let {avgStarRating, singleSpot, spotImages, previewImage, allReviews, sessionUser } = useSelector(getSpotDetails);
    let spot = singleSpot;
    // const handleReservation = () => window.alert('Feature in progress');
    const handleReservation = () => {
        history.push(`/spots/reserve/${spotId}`)
    };
    avgStarRating = allReviews.length > 0
    ? allReviews.reduce((sum, review) => sum + review.stars, 0) / allReviews.length
    : 0;
    useEffect(() => {
        dispatch(loadSpotDetails(spotId));
        dispatch(loadSpotReviews(spotId));
    }, [dispatch,spotId]);
    if(!previewImage) return null;
  return (
    // --------------------------conditional rendering galore--------------------------
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
                            <LargeCardImage image={previewImage.url}>
                            </LargeCardImage>
                        </div>
                    </div>
                </NavLink>
            </div>
            {
                spotImages.length > 1 && (
                    <div className="spot-details-images-support">
                        {spotImages.slice(1).map((image) =>
                            <SpotCardImage image={image.url}/>
                        )}
                    </div>
                )
            }
        </div>
        {/* ------HOST AND STARS INFORMATION------ */}
        <div className="spot-details-section">
            <div className="spot-details-info">
                <div className="spot-details-info-section-one">
                    <div className="spot-details-info-title">
                        <h2>
                            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                        </h2>
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
                    {
                        spot.numReviews > 0 &&
                            <>
                                <h3>
                                    {Number(avgStarRating).toFixed(1)}
                                </h3>
                                <span id="stars-label">Stars</span>
                                <div className="dot">
                                    <i class="fas fa-dot-circle" id="dot"></i>
                                </div>
                            </>
                    }
                    </div>
                    {
                    allReviews.length === 1 ?
                    (
                    <h3>
                        {Number(allReviews.length).toFixed(0)} review
                    </h3>
                    ) :
                    allReviews.length > 0 ?
                    (
                    <h3>
                        {Number(allReviews.length).toFixed(0)} reviews
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
                    {
                        spot.numReviews > 0 &&
                        <>
                            <h3>
                                {Number(avgStarRating).toFixed(1)}
                            </h3>
                            <span id="stars-label">Stars</span>
                            <div className="dot">
                                <i class="fas fa-dot-circle" id="dot"></i>
                            </div>
                        </>
                    }

                </div>
                <div className="spot-details-reviews-content-reviews">
                    {
                        allReviews.length === 1 ?
                        (
                            <h3>
                                {Number(allReviews.length).toFixed(0)} review
                            </h3>
                        ) : spot.numReviews > 0 ?
                        (
                            <h3>
                                {Number(allReviews.length).toFixed(0)} reviews
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
                            modalComponent={<PostAReviewModal
                            spot={spot}
                        />}
                        />
                    </div>
                </div>
            )
        }
    </div>
        {
            allReviews.length === 0 ?
            (
                <h3>
                    Be the first to post a review!
                </h3>
            ): (
                allReviews.map(rev => <SpotReview review={rev}/>)
            )
        }
    </div>
  );
};

export default SpotDetails;
