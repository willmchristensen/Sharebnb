import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotReview from '../SpotReview';
import ManageButtons from '../ManageButtons'
import { loadUserReviews } from '../../store/reviews';
import { deleteReviewsMemo } from '../../store/reviews';
const ManageReviews = () => {
  const dispatch = useDispatch(); 
  const {allReviews,sessionUser} = useSelector(deleteReviewsMemo);

  useEffect(() => {
    dispatch(loadUserReviews())
  }, [dispatch,sessionUser]) 
  
  return (
    <main >
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Your Reviews</h3>
          </div>
          {
            allReviews.map(review => {
              return (
                <>
                  <SpotReview review={review}></SpotReview>
                </>
              )
            })
          }
        </nav>
      </div>
    </main>
  );
};

export default ManageReviews;