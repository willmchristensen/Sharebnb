import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createOneReview } from "../../store/reviews";
import './PostReview.css'
import StarsRatingInput from './stars.js'

function PostAReviewModal({spot}) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const { closeModal } = useModal();
  const [errors,setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('description,starsdescription,starsdescription,starsdescription,starsdescription,starsdescription,,stars',review,stars)
    const rev = {review,stars};
    const newReview = await dispatch(createOneReview(rev,spot.id, user))
      .then(closeModal)
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
    });
    console.log({newReview});
    if (newReview) history.push(`/spots/${spot.id}`);
  };

  return (
    <>
  
      <form 
        className="review-modal"
        onSubmit={onSubmit}
      >
        <div className="user-information-post-review">
          <h2>Post a Review</h2>
          <div className="form-row-post-review">
            <div className="form-row-data-post-review">
              <label
                className="form-row-data-post-review-label"
              >
                How was your stay?
                <textarea 
                  name="review" 
                  value={review} 
                  onChange={e=>setReview(e.target.value)}  
                  cols="30" 
                  rows="10"
                  placeHolder="Leave your review here..."
                >
                </textarea>
              </label>
            </div>
          </div>
          <StarsRatingInput 
            changeStars={setStars} 
            rating={stars}
            value={stars}
            onChange={setStars}
          >
          </StarsRatingInput>
          <button
            type="submit"
            id="button"
          >
            Post Your Review
          </button>
        </div>
     </form>
    </>
  );
}

export default PostAReviewModal;
