import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './PostReview.css'
import StarsRatingInput from './stars.js'
function PostAReviewModal({spot}) {
  // const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  // const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();

  // TODO: REFACTOR TO AUTHENTICATE REVIEW
  // useEffect(() => {
  //   const errors = {};
  //   if(password.length < 6)errors.password = 'length';
  //   if(credential.length < 4)errors.credential = 'length';
  //   setValidationErrors(errors)
  // }, [password,credential])

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
                {/* <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={e=>setDescription(e.target.value)}
                /> */}
                <textarea 
                  name="description" 
                  value={description} 
                  onChange={e=>setDescription(e.target.value)}  
                  cols="30" 
                  rows="10"
                >
                </textarea>
              </label>
              {/* <p className="errors">{errors.description}</p>       */}
            </div>
          </div>
          {/* <div className="form-row">
            <div className="form-row-data">
            <label>
              Stars
              <input
                type="text"
                name="country"
                value={country}
                onChange={e=>setCountry(e.target.value)}
              />
            </label>
            <p className="errors">
              {errors.country}
              </p>
            </div>
          </div> */}
          <StarsRatingInput></StarsRatingInput>
          {/* <button
            type="submit"
            disabled={Boolean(Object.keys(errors).length)}
          >
            Revi the spizzle
          </button> */}
        </div>
     </form>
    </>
  );
}

export default PostAReviewModal;