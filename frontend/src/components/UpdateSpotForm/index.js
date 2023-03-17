import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
// import './CreateNewSpot.css'
import { updateOneSpot } from '../../store/spots';
import { useModal } from "../../context/Modal";

function UpdateSpot({spot}) {
  console.log('------------------------------TEST TOWN', spot);
    // TODO: UPDATE WITH CURRENT VALS FROM SPOT
  const [country,setCountry] = useState(spot.country);
  const [address,setAddress] = useState(spot.address);
  const [city,setCity] = useState(spot.city);
  const [state,setState] = useState(spot.state);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [previewImage,setPreviewImage] = useState(spot.previewImage);
  const [photoOne,setPhotoOne] = useState(spot.photoOne);
  const [photoTwo,setPhotoTwo] = useState(spot.photoTwo);
  const [photoThree,setPhotoThree] = useState(spot.photoThree);
  const [photoFour,setPhotoFour] = useState(spot.photoFour);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors,setValidationErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [photoErrors, setPhotoErrors] = useState({});
  const [id] = useState(spot.id);

  // console.log(photos);
  // console.log(previewImage);
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

  // useEffect(() => {
  //   let acceptedFiles = ['png','jpg','peg'];
  //   const errors = {}
  //   if(!previewImage){
  //     errors.previewImage = "Preview image is required.";
  //   }else if(!acceptedFiles.includes(previewImage.slice(previewImage.length - 3))){
  //     errors.previewImage = "Image URL must end in .png, .jpg, or .jpeg"
  //   }
  //   setImageErrors(errors);
  // }, [previewImage]);
  
  // useEffect(() => {
  //   let acceptedFiles = ['png','jpg','peg'];
  //   const errors = {}
  //   if(photoOne.length > 1){
  //     if(!acceptedFiles.includes(photoOne.slice(photoOne.length - 3))){
  //       errors.photoOne = "Image URL must end in .png, .jpg, or .jpeg"
  //     }
  //   }
  //   if(photoTwo.length > 1){
  //     if(!acceptedFiles.includes(photoTwo.slice(photoTwo.length - 3))){
  //       errors.photoTwo = "Image URL must end in .png, .jpg, or .jpeg"
  //     }

  //   }
  //   if(photoThree.length > 1){
  //     if(!acceptedFiles.includes(photoThree.slice(photoThree.length - 3))){
  //       errors.photoThree = "Image URL must end in .png, .jpg, or .jpeg"
  //     }

  //   }
  //   if(photoFour.length > 1){
  //     if(!acceptedFiles.includes(photoFour.slice(photoFour.length - 3))){
  //       errors.photoFour = "Image URL must end in .png, .jpg, or .jpeg"
  //     }
  //   }
  //   setPhotoErrors(errors);
  // }, [photoOne,photoTwo,photoThree,photoFour]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const vals = {
      id,country,address,city,state,description,price,lat,lng,name
    };
    const spotImages = [];
    spotImages.push({url: previewImage, preview: true});
    if(photoOne){spotImages.push({url: photoOne, preview: false});}
    if(photoTwo){spotImages.push({url: photoTwo, preview: false});}
    if(photoThree){spotImages.push({url: photoThree, preview: false});}
    if(photoFour){spotImages.push({url: photoFour, preview: false});}
    // FIXME: UPDATED SPOT
    let updatedSpot = await dispatch(updateOneSpot(vals, spotImages));
    console.log('UPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOTUPDATEDSPOT',updatedSpot)
    
    if(updatedSpot) { 
      closeModal()
      console.log('---updatedSpert-------------------------------------------',updatedSpot);
      history.push(`/spots/${updatedSpot.id}`)
    }
  }
  console.log(spot);
  return (
    <form
      className="create-spot-form"
      onSubmit={onSubmit}
    >
     <div className="user-information-create-spot">
      <h2>Update a Spot</h2>
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
            {errors.address && (<span className="errors">{errors.address}</span>)}
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
      <div className="form-row">
        <div className="form-row-data-city-state">
        <label>
          <div className="form-row-data-label">
            <span>City</span>
            <span className="errors">{errors.country}</span>
          </div>
          <input
            type="text"
            name="country"
            value={city}
            onChange={e=>setCity(e.target.value)}
            placeholder="city"
          />
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
            placeholder="state"
          />
        </label>
        </div>
      </div>
      <div className="form-row">
        <div className="form-row-data">
        <label>
        Description
          <input
            type="text"
            name="country"
            value={description}
            onChange={e=>setDescription(e.target.value)}
            placeholder="description"
          />
        </label>
        <p className="errors">
          {errors.description}
        </p>
        </div>
      </div>
      <div className="form-row">
        <div className="form-row-data">
        <label>
        Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="name"
          />
        </label>
        <p className="errors">
          {errors.name}
          </p>
        </div>
      </div>
      {/* TODO: IMPLEMENT PRICE IN BOTH FORMS!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* price
      setPrice */}
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