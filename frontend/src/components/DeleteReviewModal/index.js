import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOneReview } from "../../store/reviews";
function DeleteReviewModal({review}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const handleDelete = (e) => {
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
