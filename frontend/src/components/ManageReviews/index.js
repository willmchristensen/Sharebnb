import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import SpotReview from '../SpotReview';
import ManageButtons from '../ManageButtons'
// import './SpotDetails.css';

const ManageReviews = () => {
  
  return (
    <>
    <div className="manage-reviews-section">
        <h2>Manage Reviews</h2>
         <SpotReview></SpotReview>
        <ManageButtons></ManageButtons>
    </div>
    </>
  );
};

export default ManageReviews;