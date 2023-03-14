import { useEffect,useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SpotCardImage from '../SpotCardImage';
import LargeCardImage from '../SpotCardImage/LargeCardImage';
import OpenModalMenuItem from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';
import './SpotReview.css';

const SpotReview = ({review}) => {
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
    const handleReservation = () => window.alert('Feature in progress');
    const sessionUser = useSelector(state => state.session.user);

    // const reviews = spot.reviews;
    // console.log('------------------------------reviews',reviews);
    // console.log('------------------------------spot',spot);

    let date = new Date(review.createdAt);
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let monthNum = date.getMonth();
    let month = months[monthNum - 1];
    let year = date.getFullYear();

  return (
    <div className="spot-review">
        <h3 className="spot-review-name">
            {review.User.firstName} {review.User.lastName}
        </h3>
        <h3 className="spot-review-date">
            {month} {year}
        </h3>
        <p className="spot-review-description">
            {review.review}
        </p>
        {/* {belongsToUser &&
            <button id="spot-review-button">
                delete
            </button>
        } */}
          { sessionUser && !Boolean(review.userId === sessionUser.id) &&
        (
            <div className="modal-material">
                {/* <button 
                    className="review-spot"
                    id="button"
                    // onClick={handleReview}
                >
                    Post Your Review
                </button> */}
               <h1>CHANGE CONDITIONAL ABOVE AND ADD TEXT BELOW</h1>
               <OpenModalMenuItem
                    itemText="BREH"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteReviewModal review={review}/>}
                />
            </div>
            
        )
    }
    </div>
  );
};

export default SpotReview;