import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotReview from '../SpotReview';
import ManageButtons from '../ManageButtons'
import { loadUserReviews } from '../../store/reviews';
import { loadSpotDetails } from '../../store/spots';
import SpotCards from '../SpotCards';

const ManageReviews = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(loadUserReviews())
  }, [dispatch]) 
  let reviews = useSelector(state => state.reviews.user);
  // console.log('-------------STATE-------------', reviews)
  let allReviews = Object.values(reviews);
  // console.log('------------------------------allReviews', allReviews);

  return (
    <main >
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Your Reviews</h3>
            {/* <h2>{allReviews[0].Spot.address}</h2>     */}
          </div>
          {
            allReviews.map(review => {
              return (
                <>
                  <SpotReview review={review}></SpotReview>
                  {/* FIXME: MANAGE THE REVIEW */}
                  <ManageButtons review={review}></ManageButtons>
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