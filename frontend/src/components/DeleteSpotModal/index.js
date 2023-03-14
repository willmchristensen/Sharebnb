import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteASpot.css'

function DeleteSpotModal({spot}) {
  const { closeModal } = useModal();

  // TODO: REFACTOR TO DELETE A SPOT
  const handleDelete = (e) => {
    e.preventDefault();
    // setErrors([]);
    console.log('this will dispatch delete');
    // return dispatch(deleteASpot(spot))
    //   .then(closeModal)
    //   .catch(
    //     async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     }
    //   );
  };

  return (
    <>
    <div className="delete-a-spot">
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <div className="delete-buttons">
        <button 
          id="delete-button"
          onClick={handleDelete}
        >
          Yes (Delete Spot)
        </button>
        <button 
          id="keep-button"
          onClick={closeModal}
        >
          No (Keep Spot)
        </button>
      </div>
    </div>
    </>
  );
}

export default DeleteSpotModal;