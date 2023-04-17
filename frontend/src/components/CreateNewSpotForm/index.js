import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './CreateNewSpot.css'
import { createOneSpot } from '../../store/spots';
import { useModal } from "../../context/Modal";
import { addSpotImage } from '../../store/spots';

function CreateNewSpot() {

  const [country,setCountry] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage,setPreviewImage] = useState('');
  const [photoOne,setPhotoOne] = useState('');
  const [photoTwo,setPhotoTwo] = useState('');
  const [photoThree,setPhotoThree] = useState('');
  const [photoFour,setPhotoFour] = useState('');
  const [lat, setLat] = useState(0.1);
  const [lng, setLng] = useState(0.2);
  const [errors,setValidationErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [photoErrors, setPhotoErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // --------------------------------------------------
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  // --------------------validation errors---------------------------------
  useEffect(() => {
    const errors = {};
    if(!country) errors.country = "Country is required"
    if(!address) errors.address = "Address is required"
    if(!city) errors.city = "City is required"
    if(!state) errors.state = "State is required"
    if(!description) errors.description = "Description is required"
    if(description.length < 30) errors.description = "Description needs 30 or more characters";
    if(!name) errors.name = "Title is required"
    if(!price) errors.price = "Price is required"
    setValidationErrors(errors)
  }, [country,address,city,state,description,name,price]);
  // --------------------validation errors---------------------------------
  // --------------------image errors--------------------------------------
  useEffect(() => {
    let acceptedFiles = ['png','jpg','peg'];
    const errors = {}
    if(!previewImage){
      errors.previewImage = "Preview image is required.";
    }else if(!acceptedFiles.includes(previewImage.slice(previewImage.length - 3))){
      errors.previewImage = "Image URL must end in .png, .jpg, or .jpeg"
    }
    setImageErrors(errors);
  }, [previewImage]);
  // useEffect(() => {
  //   let acceptedFiles = ['png','jpg','peg'];
  //   const errors = {}
  //   if(photoOne.length > 0 && !acceptedFiles.includes(photoOne.slice(photoOne.length - 3))){
  //     errors.photoOne = "Image URL must end in .png, .jpg, or .jpeg"
  //   }
  //   if(photoTwo.length > 0 && !acceptedFiles.includes(photoTwo.slice(photoTwo.length - 3))){
  //     errors.photoTwo = "Image URL must end in .png, .jpg, or .jpeg"
  //   }
  //   if(photoThree.length > 0 && !acceptedFiles.includes(photoThree.slice(photoThree.length - 3))){
  //     errors.photoThree = "Image URL must end in .png, .jpg, or .jpeg"
  //   }
  //   if(photoFour.length > 0 && !acceptedFiles.includes(photoFour.slice(photoFour.length - 3))){
  //     errors.photoOne = "Image URL must end in .png, .jpg, or .jpeg"
  //   }
  //   setPhotoErrors(errors);
  // }, [photoOne,photoTwo,photoThree,photoFour]);
  // --------------------image errors--------------------------------------
  // -----------------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const vals = {
      country, address, city, state, description, price, lat, lng, name, previewImage,photoOne,photoTwo,photoThree,photoFour
    };
    console.log(vals)
    let createdSpot = await dispatch(createOneSpot(vals));
    if (createdSpot) {
      // Dispatch addSpotImage only if createdSpot is not null or undefined
      let prevImg = await dispatch(addSpotImage(createdSpot.id, previewImage, true));
      if (photoOne) {
        await dispatch(addSpotImage(createdSpot.id, photoOne, false));
      }
      if (photoTwo) {
        await dispatch(addSpotImage(createdSpot.id, photoTwo, false));
      }
      if (photoThree) {
        await dispatch(addSpotImage(createdSpot.id, photoThree, false));
      }
      if (photoFour) {
        await dispatch(addSpotImage(createdSpot.id, photoFour, false));
      }
      if (prevImg) {
        history.push(`/spots/${createdSpot.id}`);
      }
      closeModal();
    }
  };
  return (
    <form className="create-spot-form" onSubmit={onSubmit}>
     <div className="user-information-create-spot">
      <div className="form-section one">
        <div className="form-row">
          <div
            className="form-row-data"
            id="top"
          >
            <h1>Create a New Spot</h1>
            <h2 id="subtitle">
              Where's your place located?
            </h2>
            <p>
              Guests will only get your exact address once they booked a reservation.
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <div className="form-row-data-label">
              <span>Country</span>
              {isSubmitted && <span className="errors">{errors.country}</span>}
            </div>
            <input
              type="text"
              name="country"
              value={country}
              onChange={e=>setCountry(e.target.value)}
              placeholder="Country"
            />
          </label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <div className="form-row-data-label">
              <span>Address</span>
              {isSubmitted && <span className="errors">{errors.address}</span>}
            </div>
            <input
              type="text"
              name="country"
              value={address}
              onChange={e=>setAddress(e.target.value)}
              placeholder="Address"
            />
          </label>
          </div>
        </div>
        <div className="form-row city-state">
          <div className="form-row-data-city-state">
            <label>
              <div className="form-row-data-label">
                <span>City</span>
                {isSubmitted && <span className="errors">{errors.city}</span>}
              </div>
                <label>
                  <input
                    type="text"
                    name="country"
                    value={city}
                    onChange={e=>setCity(e.target.value)}
                    placeholder="City"
                  />
                </label>
            </label>
            <label>
              <div className="form-row-data-label">
                <span>State</span>
                {isSubmitted && <span className="errors">{errors.state}</span>}
              </div>
            <input
              type="text"
              name="country"
              value={state}
              onChange={e=>setState(e.target.value)}
              placeholder="State"
            />
            </label>
            </div>
          </div>
      </div>
      <div className="form-section two">
        <div className="form-row">
          <div className="form-row-data" id="top">
            <h2 id="subtitle">Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <textarea
            className="text-area"
            name="review"
            value={description}
            onChange={e=>setDescription(e.target.value)}
            cols="30"
            rows="5"
            placeholder="Please write at least 30 characters"
            />
          </label>
          {isSubmitted && <p className="errors">
            {errors.description}
          </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
            <h2 id="subtitle">Create a title for your spot</h2>
            <p>
              Catch guests' attention with a spot title that highlights what makes your place special.
            </p>
          </div>
          <div className="form-row-data">
            <label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder="Name of your spot"
              />
            </label>
            {isSubmitted && <p className="errors">
              {errors.name}
            </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
            <h2 id="subtitle">Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank higher
              in search results.
            </p>
          </div>
          <div className="form-row-data">
            <label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={e=>setPrice(e.target.value)}
                placeholder="Price"
              />
            </label>
              {
                isSubmitted &&
                <p className="errors">
                  {errors.price}
                </p>
              }
          </div>
        </div>
      </div>
      <div className="form-section three">
        <div className="form-row">
          <div className="form-row-data" id="top">
            <h2 id="subtitle">
              Liven up your spot with photos
            </h2>
            <p>
              Submit a link to at least one photo to publish your spot.
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="url"
              name="previewImage"
              value={previewImage}
              onChange={e=>setPreviewImage(e.target.value)}
              placeholder="Preview Image URL"
            />
          </label>
          {isSubmitted && <p className="errors">
            {imageErrors.previewImage}
          </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="url"
              name="photoOne"
              value={photoOne}
              onChange={e=>setPhotoOne(e.target.value)}
              placeholder="Image URL"
            />
          </label>
            {imageErrors.photoOne && <p className="errors">
              {photoErrors.photoOne}
            </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="url"
              name="photoTwo"
              value={photoTwo}
              onChange={e=>setPhotoTwo(e.target.value)}
              placeholder="Image URL"
            />
          </label>
          {imageErrors.photoTwo && <p className="errors">
              {photoErrors.photoTwo}
            </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="url"
              name="photoThree"
              value={photoThree}
              onChange={e=>setPhotoThree(e.target.value)}
              placeholder="Image URL"
            />
          </label>
          {imageErrors.photoThree && <p className="errors">
              {photoErrors.photoThree}
            </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="url"
              name="photoFour"
              value={photoFour}
              onChange={e=>setPhotoFour(e.target.value)}
              placeholder="Image URL"
            />
          </label>
          {imageErrors.photoFour && <p className="errors">
              {photoErrors.photoFour}
            </p>}
          </div>
        </div>
      </div>
      <button
        type="submit"
        // className="create-button"
        id="manage"
        disabled={Boolean(Object.keys(errors).length) || Boolean(Object.keys(imageErrors).length)}
      >
        Create Spot
      </button>
     </div>
    </form>
  );
}

export default CreateNewSpot;
