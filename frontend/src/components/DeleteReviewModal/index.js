import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteReview.css'
import { deleteOneReview } from "../../store/reviews";
function DeleteReviewModal({review}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  console.log(review,'review in -delete-review---------------------------------------------')

  const handleDelete = (e) => {
    console.log('this will dispatch delete');
    return dispatch(deleteOneReview(review.id))
      .then(closeModal)
  };
  return (
    <>
      <div className="delete-a-spot">
        <h2>Confirm Delete</h2>
        <h3>Are you sure you want to remove this review from the listings?</h3>
        <div className="delete-buttons">
          <button 
            id="delete-button"
            onClick={handleDelete}
          >
            Yes (Delete Review)
          </button>
          <button 
            id="keep-button"
            onClick={closeModal}
          >
            No (Keep Review)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;