import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteBookingModal.css'
import { deleteOneBooking } from "../../store/bookings";

function DeleteBookingModal({booking}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  console.log(booking,'BOOKING-IN-DELETE-BOOKING------------------------------------------------')

  const handleDelete = async (e) => {
    await dispatch(deleteOneBooking(booking.id))
      .then(closeModal)
  };

  return (
    <>
      <div className="delete-a-spot">
        <h2>Confirm Delete</h2>
        <h3>Are you sure you want to remove this booking</h3>
        <div className="delete-buttons">
          <button 
            id="delete-button"
            onClick={handleDelete}
          >
            Yes (Delete Booking)
          </button>
          <button 
            id="keep-button"
            onClick={closeModal}
          >
            No (Keep Booking)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteBookingModal;