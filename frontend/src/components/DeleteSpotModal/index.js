import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteASpot.css'
import { deleteOneSpot } from "../../store/spots";
import { loadUserSpots } from '../../store/spots';

function DeleteSpotModal({spot}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // TODO: NOT UPDATING STATE, 400 CUZ TRYING TO DELETE A SPOT THAT HAS BEEN DELETED
  const handleDelete = (e) => {
    e.preventDefault();
    // setErrors([]);
    console.log('this will dispatch delete');
    dispatch(loadUserSpots())
    return dispatch(deleteOneSpot(spot.id))
      .then(closeModal)
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