import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './CreateNewSpot.css'
import { createOneSpot } from '../../store/spots';

import { useModal } from "../../context/Modal";


function CreateNewSpot() {

  const [country,setCountry] = useState('Actual Country');
  const [address,setAddress] = useState('123 Address');
  const [city,setCity] = useState('SomeCity');
  const [state,setState] = useState('AState');
  const [description, setDescription] = useState('This is me describing this spotThis is me describing this spotThis is me describing this spot');
  const [name, setName] = useState('Spot Name Here');
  const [price, setPrice] = useState(100.0);
  const [previewImage,setPreviewImage] = useState('');
  const [photoOne,setPhotoOne] = useState('');
  const [photoTwo,setPhotoTwo] = useState('');
  const [photoThree,setPhotoThree] = useState('');
  const [photoFour,setPhotoFour] = useState('');
  const [lat, setLat] = useState(0.1);
  const [lng, setLng] = useState(0.2);

  // ------------------------------------------
  // const [country,setCountry] = useState('');
  // const [address,setAddress] = useState('');
  // const [city,setCity] = useState('');
  // const [state,setState] = useState('');
  // const [description, setDescription] = useState('');
  // const [name, setName] = useState('');
  // const [price, setPrice] = useState();
  // const [previewImage,setPreviewImage] = useState('');
  // const [photos, setPhotos] = useState([]);
  // const [lat, setLat] = useState(0.1);
  // const [lng, setLng] = useState(0.2);

    const { closeModal } = useModal();


  const history = useHistory();
  const dispatch = useDispatch();
  const [errors,setValidationErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [photoErrors, setPhotoErrors] = useState({});

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
  
  useEffect(() => {
    let acceptedFiles = ['png','jpg','peg'];
    const errors = {}
    if(!acceptedFiles.includes(photoOne.slice(photoOne.length - 3))){
      errors.photoOne = "Image URL must end in .png, .jpg, or .jpeg"
    }
    if(!acceptedFiles.includes(photoTwo.slice(photoTwo.length - 3))){
      errors.photoTwo = "Image URL must end in .png, .jpg, or .jpeg"
    }
    if(!acceptedFiles.includes(photoThree.slice(photoThree.length - 3))){
      errors.photoThree = "Image URL must end in .png, .jpg, or .jpeg"
    }
    if(!acceptedFiles.includes(photoFour.slice(photoFour.length - 3))){
      errors.photoOne = "Image URL must end in .png, .jpg, or .jpeg"
    }
    setPhotoErrors(errors);
  }, [photoOne,photoTwo,photoThree,photoFour]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const vals = {
      country,address,city,state,description,price,lat,lng,name
    };
    const spotImages = [];
    spotImages.push({url: previewImage, preview: true});
    if(photoOne){spotImages.push({url: photoOne, preview: false});}
    if(photoTwo){spotImages.push({url: photoTwo, preview: false});}
    if(photoThree){spotImages.push({url: photoThree, preview: false});}
    if(photoFour){spotImages.push({url: photoFour, preview: false});}
    let createdSpot = await dispatch(createOneSpot(vals,spotImages));
    console.log('createdSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOTcreatedSPOT',createdSpot)
    history.push(`/spots/${createdSpot.id}`)
    closeModal()
  }
  return (
    <form
      className="create-spot-form"
      onSubmit={onSubmit}
    >
     <div className="user-information-create-spot">
      <h2>Create a Spot</h2>
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
      <h2>Liven up your spot with photos</h2>
      <h3>Submit a link to at least one photo to publish your spot.</h3>
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

export default CreateNewSpot;