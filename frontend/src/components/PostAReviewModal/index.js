import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createOneReview } from "../../store/reviews";
import { loadSpotDetails } from "../../store/spots";
import './PostReview.css'
import StarsRatingInput from './stars.js'

function PostAReviewModal({spot,spotId}) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const { closeModal } = useModal();
  const [errors,setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if(stars <= 0 || review.length < 10){
      setIsDisabled(true)
      errors.input = 'Invalid review'
    }else{
      errors.input = null
      setIsDisabled(false)
    }
  }, [stars,review])

  const onSubmit = async (e) => {
    e.preventDefault();
    const rev = {review,stars};
    const newReview = await dispatch(createOneReview(rev,spot.id, user))
      .then(closeModal)
      .then(dispatch(loadSpotDetails(spotId)))
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
      });
    // if (newReview) history.push(`/spots/${spot.id}`);
  };

  return (
    <>

      <form
        className="review-modal"
        onSubmit={onSubmit}
      >
        <div className="user-information-post-review">
          <h2>How was your stay?</h2>
          {Object.values(errors).length > 0 && <p className="errors">{errors.input}</p>}
          <div className="form-row-post-review">
            <div className="form-row-data-post-review">
              <label
                className="form-row-data-post-review-label"
              >
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
            id="review-button"
            disabled={isDisabled}
          >
            Submit Your Review
          </button>
        </div>
     </form>
    </>
  );
}

export default PostAReviewModal;
