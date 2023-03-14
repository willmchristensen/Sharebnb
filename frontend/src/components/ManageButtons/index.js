import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ManageButtons.css'
const ManageButtons = (spot) => {

  return (
    <>
        <div className="manage-buttons">
            <button id="manage-button">Update</button>
            <button id="manage-button">Delete</button>
        </div>
    </>
  );
};

export default ManageButtons;