import React, { useState, useEffect } from "react";
import addOneReview from '../../store/spots';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './PostReview.css'
import StarsRatingInput from './stars.js'
function PostAReviewModal({spot}) {
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const { closeModal } = useModal();
  const [errors,setErrors] = useState({});
  const dispatch = useDispatch();
  // TODO: REFACTOR TO AUTHENTICATE REVIEW
  // useEffect(() => {
  //   const errors = {};
  //   if(description.length < 10)errors.description = 'length';
  //   if(stars < 1)errors.credential = 'length';
  //   setErrors(errors)
  // }, [description,stars])

  // TODO: REFACTOR TO POST A REVIEW
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(
  //       async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) setErrors(data.errors);
  //       }
  //     );
  // };
  const onSubmit = async (e) => {
    e.preventDefault();
    const vals = {
      description,stars
    };
    let createdReview = await dispatch(addOneReview());
  }
  return (
    <>
    {/* onSubmit={handleSubmit} */}
      <form className="review-modal">
        <div className="user-information-post-review">
          <h2>Post a Review</h2>
          <div className="form-row-post-review">
            <div className="form-row-data-post-review">
              <label
                className="form-row-data-post-review-label"
              >
                How was your stay?
                <textarea 
                  name="description" 
                  value={description} 
                  onChange={e=>setDescription(e.target.value)}  
                  cols="30" 
                  rows="10"
                >
                </textarea>
              </label>
            </div>
          </div>
          <StarsRatingInput changeStars={setStars} rating={stars}></StarsRatingInput>
          {/* <button
            type="submit"
            id="button"
            // disabled={Boolean(Object.keys(errors).length)}
            onClick={() => {console.log('hi')}}
          >
            Post Your Review
          </button> */}
        </div>
     </form>
    </>
  );
}

export default PostAReviewModal;