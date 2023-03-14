import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteReview.css'

function DeleteReviewModal() {
  const { closeModal } = useModal();

  // TODO: REFACTOR TO DELETE A SPOT
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(
  //       async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) setErrors(data.errors);
  //       }
  //     );
  // };

  return (
    <>
      <div className="delete-a-spot">
        <h2>Confirm Delete</h2>
        <h3>Are you sure you want to remove this review from the listings?</h3>
        <div className="delete-buttons">
          <button 
            id="delete-button"
            // onClick={handleDelete}
          >
            Yes (Delete Review)
          </button>
          <button 
            id="keep-button"
            // onClick={closeModal}
          >
            No (Keep Review)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;