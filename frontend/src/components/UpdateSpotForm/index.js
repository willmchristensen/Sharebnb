import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { updateOneSpot } from '../../store/spots';
import { addSpotImage } from '../../store/spots';
import { useModal } from "../../context/Modal";

function UpdateSpot({spot}) {
  const allspots = useSelector(state=> state.spots.allSpots);
  const [country,setCountry] = useState(spot.country);
  const [address,setAddress] = useState(spot.address);
  const [city,setCity] = useState(spot.city);
  const [state,setState] = useState(spot.state);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [previewImage,setPreviewImage] = useState(spot.previewImage);
  // const [photoOne,setPhotoOne] = useState(spot.SpotImages[0]);
  // const [photoTwo,setPhotoTwo] = useState(spot.SpotImages[1]);
  // const [photoThree,setPhotoThree] = useState(spot.SpotImages[2]);
  // const [photoFour,setPhotoFour] = useState(spot.SpotImages[3]);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors,setValidationErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [photoErrors, setPhotoErrors] = useState({});
  const [id] = useState(spot.id);

  useEffect(() => {
    const errors = {};
    if(!country) errors.country = "Country is required"
    if(!address) errors.address = "Address is required"
    if(!city) errors.city = "City is required"
    if(!state) errors.state = "State is required"
    if(!description) errors.description = "Description is required"
    if(description.length < 30) errors.description = "Description needs 30 or more characters";
    if(!name) errors.name = "Title is required"
    if(!price) errors.price = "BasePrice is required"
    setValidationErrors(errors) 
  }, [country,address,city,state,description,name,price]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const vals = {
      id,country,address,city,state,description,price,lat,lng,name
    };
    let createdSpot = await dispatch(updateOneSpot(vals));
    if(createdSpot){
      let prevImg = await dispatch(addSpotImage(createdSpot.id,previewImage,true));
      // if(photoOne){
      //   await dispatch(addSpotImage(createdSpot.id,photoOne,false));
      // }
      // if(photoTwo){
      //   await dispatch(addSpotImage(createdSpot.id,photoTwo,false));
      // }
      // if(photoThree){
      //   await dispatch(addSpotImage(createdSpot.id,photoThree,false));
      // }
      // if(photoFour){
      //   await dispatch(addSpotImage(createdSpot.id,photoFour,false));
      // }
      if(prevImg) history.push(`/spots/${createdSpot.id}`)
      closeModal()
    }
  }
  return (
    <form
      className="create-spot-form"
      onSubmit={onSubmit}
    >
     <div className="user-information-create-spot">
      <div className="form-section one">
        <div className="form-row">
          <div className="form-row-data">
            <h1>Update Your Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <div className="form-row-data-label">
              <span>Country</span>
              <span className="errors">{errors.country}</span>
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
              <span className="errors">{errors.address}</span>
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
                <span className="errors">{errors.city}
                </span>
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
                <span className="errors">{errors.state}</span>
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
      <div className="form-section three">
        <div className="form-row">
          <div className="form-row-data">
            <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <textarea
            name="review" 
            value={description} 
            onChange={e=>setDescription(e.target.value)}  
            cols="30" 
            rows="5"
            placeHolder="Please write at least 30 characters"
            />
          </label>
          <p className="errors">
            {errors.description}
          </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
            <h2>Create a title for your spot</h2>
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
            <p className="errors">
              {errors.name}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank higher 
              in search results.
            </p>
          </div>
          <div className="form-row-data">
            <label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={e=>setPrice(e.target.value)}
                placeholder="Price"
              />
            </label>
              <p className="errors">
                {errors.price}
              </p>
          </div>
        </div>
      </div>
      {/* <div className="form-section four">
        <div className="form-row">
          <div className="form-row-data">
            <h2>Liven up your spot with photos</h2>
            <p>
              Submit a link to at least one photo to publish your spot.
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="text"
              name="country"
              value={previewImage}
              onChange={e=>setPreviewImage(e.target.value)}
              placeholder="Preview Image URL"
            />
          </label>
          {imageErrors.previewImage && <p className="errors">
            {imageErrors.previewImage}
          </p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="text"
              name="country"
              value={photoOne}
              onChange={e=>setPhotoOne(e.target.value)}
              placeholder="Image URL"
            />
          </label>
            <p className="errors">
              {photoErrors.photoOne}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="text"
              name="country"
              value={photoTwo}
              onChange={e=>setPhotoTwo(e.target.value)}
              placeholder="Image URL"
            />
          </label>
          <p className="errors">
            {photoErrors.photoTwo}
          </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="text"
              name="country"
              value={photoThree}
              onChange={e=>setPhotoThree(e.target.value)}
              placeholder="Image URL"
            />
          </label>
          <p className="errors">
            {photoErrors.photoThree}
          </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
          <label>
            <input
              type="text"
              name="country"
              value={photoFour}
              onChange={e=>setPhotoFour(e.target.value)}
              placeholder="Image URL"
            />
          </label>
          <p className="errors">
            {photoErrors.photoFour}
          </p>
          </div>
        </div>
      </div> */}
      <button
        type="submit"
        disabled={Boolean(Object.keys(errors).length) || Boolean(Object.keys(imageErrors).length)}
      >
        Create Spot
      </button>
     </div>
    </form>
  );
}

export default UpdateSpot;