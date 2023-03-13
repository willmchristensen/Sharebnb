import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ManageButtons.css'
const ManageButtons = (spot) => {

  return (
    <>
        <div className="manage-buttons">
            <button id="button">Update</button>
            <button id="button">Delete</button>
        </div>
    </>
  );
};

export default ManageButtons;