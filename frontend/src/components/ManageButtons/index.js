import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalMenuItem from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'
import UpdateReviewModal from '../UpdateReviewModal'
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
              <OpenModalMenuItem
                  buttonText="Update Review"
                  onItemClick={closeMenu}
                  modalComponent={<UpdateReviewModal spot={spot}/>}
              />
              <OpenModalMenuItem
                  buttonText="Delete Review"
                  onItemClick={closeMenu}
                  modalComponent={<DeleteReviewModal spot={spot}/>}
              />
            </div>
        </div>
    </>
  );
};

export default ManageButtons;