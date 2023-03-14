import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './CreateNewSpot.css'
import { addOneSpot } from '../../store/spots';

function CreateNewSpot() {
  const [country,setCountry] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [photos, setPhotos] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);


  const history = useHistory();
  const dispatch = useDispatch();

  const [errors,setValidationErrors] = useState({});
  
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
    // FIXME: PHOTOS ERRORS 
    if(!Boolean(Object.keys(photos).length)) errors.photos = "Photos is required"
    let acceptedFiles = ['png','jpg','peg'];
    if(!acceptedFiles.includes(photos.slice(photos.length - 3))){
      errors.photos = "Image URL must end in .png, .jpg, or .jpeg";
    }

    setValidationErrors(errors) 
  }, [country,address,city,state,description,name,price,photos])

  // name
  const onSubmit = async (e) => {
    e.preventDefault()
    const vals = {country,address,city,state,description,price, lat, lng};
    // console.table(vals);
    let createdSpot = await dispatch(addOneSpot(vals));
    if(createdSpot){
      history.push(`/spots/${createdSpot.id}`)
    }
    console.log(createdSpot);
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
          <span>Set a base price for your spot</span>
          <span className="errors">{errors.price}</span>
        </div>
         <input
           type="number"
           name="price"
           value={price}
           onChange={e=>setPrice(e.target.value)}
           placeholder="Price per night (USD)"
         />
       </label>
             
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
            <span className="errors">{errors.country}</span>
          </div>
          <input
            type="text"
            name="country"
            value={address}
            onChange={e=>setAddress(e.target.value)}
            placeholder="Address"
          />
        </label>
        <p className="errors">
          {errors.Address}
          </p>
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
            value={photos}
            onChange={e=>setPhotos(e.target.value)}
            placeholder="Preview Image URL"
          />
        </label>
        {<p className="errors">
          {errors.photos}
        </p>}
        </div>
      </div>
     
      <button
        type="submit"
        disabled={Boolean(Object.keys(errors).length)}
      >
        Create Spot
      </button>
     </div>
    </form>
  );
}

export default CreateNewSpot;