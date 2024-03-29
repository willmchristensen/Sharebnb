import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'
import UpdateReviewModal from '../UpdateReviewModal'
import UpdateBookingModal from '../UpdateBookingModal';
import DeleteSpotModal from '../DeleteSpotModal'
import DeleteBookingModal from '../DeleteBookingModal';
import UpdateSpot from '../UpdateSpotForm';
import './ManageButtons.css'
import UpdateBooking from '../UpdateBookingModal';

const ManageButtons = ({ spot, review, booking }) => {
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
  return (
    <>
      {
        review ?
          (
            <div className="modal-material">
              <OpenModalMenuItem
                buttonText="Delete Review"
                modalComponent={<DeleteReviewModal review={review} />}
              />
            </div>
          ) : spot ? (
            <div className="modal-material">
              <OpenModalMenuItem
                buttonText="Update"
                modalComponent={<UpdateSpot spot={spot} />}
              />
              <OpenModalMenuItem
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
              />
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                buttonText="Update"
                modalComponent={<UpdateBookingModal booking={booking} />}
              />
              <OpenModalMenuItem
                buttonText="Delete"
                modalComponent={<DeleteBookingModal booking={booking} />}
              />
            </>
          )
      }
    </>
  );
};

export default ManageButtons;
