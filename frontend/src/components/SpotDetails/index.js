// TODO: double check dependencies
// TODO: WIDTH 1000PX??
import { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import { NavLink, useParams} from 'react-router-dom';
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
    console.log('------------------------------spot', spot,spotImages
    ,previewImage);
    const reviews = useSelector(state => state.reviews.spot);
    const allReviews = Object.values(reviews);
    const sessionUser = useSelector(state => state.session.user);
    // ---------------data------------------
    const handleReservation = () => window.alert('Feature in progress');
    useEffect(() => {
        dispatch(loadSpotDetails(spotId));
    }, [dispatch,spotId])
    useEffect(() => {
        dispatch(loadSpotReviews(spotId));
    }, [dispatch,spotId])
    // let var1 = dispatch(loadSpotDetails(spotId));
    // let var2 = dispatch(loadSpotReviews(spotId));
    // console.log('var1,var2',var1
    // ,var2)
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
                            <img src={previewImage.url} alt="prev-img" />
                        </div>
                    </div>
                </NavLink>
            </div>
                {
                    spotImages.length > 1 && (
                        <div className="spot-details-images-support">
                            <div className="spot-details-images-support-cards">
                                {
                                    spotImages.map(image => {
                                        return (
                                            <img src={image.url} alt="supp-img" id="support-image"/>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    )
                }
        </div>
        <div className="spot-details-section">
            <div className="spot-details-info">
                <hr />
                <div className="spot-details-info-title">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                </div>
                <div className="spot-details-info-description">
                    <p>
                        {spot.description}
                    </p>
                </div>
                <div className="spot-details-info-reserve">
                    <div className="spot-details-info-reserve-info">
                        <div className="spot-details-info-reserve-price">
                            <h3>${spot.price} per night</h3>
                        </div>
                        <div className="spot-details-info-reserve-reviews-stars">
                            <h3>{spot.avgStarRating}</h3>
                            {
                                spot.numReviews > 0 ? 
                                (
                                    <h3>
                                        {spot.numReviews} review(s)
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
                <h3>{spot.avgStarRating}</h3>
            </div>
            <div className="spot-details-reviews-content-reviews">
                {
                    spot.numReviews > 0 ? (
                        <h3>
                            {spot.numReviews} review(s)
                        </h3> 
                    ) : <h3>"New"</h3>
                }
            </div>
        </div>
    </div>
    { sessionUser && !allReviews.find(rev => rev.userId === sessionUser.id) && spot.ownerId !== sessionUser.id &&
        (
            <div className="modal-material">
                <OpenModalMenuItem
                    buttonText="POST A REVIEW"
                    modalComponent={<PostAReviewModal spot={spot}/>}
                />
            </div>
        )
    }
    </div>
        { 
            allReviews.map(review => {
                return (
                    <SpotReview review={review}></SpotReview>
                );
            })
        }
    </div>
  );
};

export default SpotDetails;