import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalMenuItem from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'
import UpdateReviewModal from '../UpdateReviewModal'
import DeleteSpotModal from '../DeleteSpotModal'
import UpdateSpot from '../UpdateSpotForm';
import './ManageButtons.css'

const ManageButtons = ({spot, review}) => {
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
// FIXME: delete rview on spot details works fine, delete review on manage reviews requires a refresh.
  return (
    <>
      { 
        review ? 
        (
          <div className="modal-material">
            {console.log(review,'review in -delete-review-modal--------------------------------------------**')}
              {/* <OpenModalMenuItem
                buttonText="Update Review"
                // onItemClick={closeMenu}
                modalComponent={<UpdateReviewModal review={review}/>}
              />*/}
              <OpenModalMenuItem
                  buttonText="Delete Review"
                  // onItemClick={closeMenu}
                  modalComponent={<DeleteReviewModal review={review}/>}
              /> 
          </div>  
          ) : (
          <div className="modal-material">
            <OpenModalMenuItem
              buttonText="Update Spot"
              // onItemClick={closeMenu}
              modalComponent={<UpdateSpot spot={spot}/>}
            />
            <OpenModalMenuItem
                buttonText="Delete Spot"
                // onItemClick={closeMenu}
                modalComponent={<DeleteSpotModal spot={spot}/>}
            />
          </div>
        )
      }
    </>
  );
};

export default ManageButtons;