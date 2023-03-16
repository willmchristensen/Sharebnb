// TODO: double check dependencies
// TODO: WIDTH 1000PX??
import { useEffect,useState,useRef } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import { NavLink, Route, useParams} from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import SpotReview from '../SpotReview';
import { loadSpotDetails } from '../../store/spots';
import {loadSpotReviews} from '../../store/reviews';
import PostAReviewModal from '../PostAReviewModal/index';
import OpenModalMenuItem from '../OpenModalButton';
import './SpotDetails.css';

const SpotDetails = () => {
    // ---------------modal------------------
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    }
    const closeMenu = () => setShowMenu(false);
    useEffect(() => {
      if (!showMenu) return;
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    // ---------------modal------------------
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
    }, [dispatch,spotId])
    useEffect(() => {
        dispatch(loadSpotReviews(spotId));
    }, [dispatch,spotId])
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
                            <LargeCardImage image={previewImage}></LargeCardImage>
                        </div>
                    </div>
                </NavLink>
            </div>
            {/* TODO: MAP OVER SPOT  */}
            <div className="spot-details-images-support">
                <div className="spot-details-images-support-cards">
                    {spotImages.map((image) =>
                        <img src={`${image.url}`} alt="" />
                    )}
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
                        {/* TODO: CONDITIONALLY RENDER POST A REVIEW BUTTON */}
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
                {spot.numReviews > 0 ? (
                    <h3>
                        {spot.numReviews} review(s)
                    </h3> 
                ) : <h3>"New"</h3>}
            </div>
        </div>
    </div>
    { sessionUser && !Boolean(allReviews.find(rev => rev.userId === sessionUser.id)) && spot.ownerId !== sessionUser.id &&
        (
            <div className="modal-material">
               <OpenModalMenuItem
                    buttonText="POST A REVIEW"
                    onItemClick={closeMenu}
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