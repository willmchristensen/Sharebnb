import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalMenuItem from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal'
import './ManageButtons.css'
const ManageButtons = ({spot}) => {
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
  // const handleUpdate = () => {
  //   console.log('update')
  // }
  // const handle = () => {
    
  // }

  return (
    <>
        <div className="manage-buttons">
            <button id="manage-button">Update</button>
            <div className="modal-material">
                {/* <button 
                    className="review-spot"
                    id="button"
                    // onClick={handleReview}
                >
                    Post Your Review
                </button> */}
               <h1>ADD TEXT BELOW</h1>
               <OpenModalMenuItem
                    buttonText="BREH"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteSpotModal spot={spot}/>}
                />
            </div>
        </div>
    </>
  );
};

export default ManageButtons;