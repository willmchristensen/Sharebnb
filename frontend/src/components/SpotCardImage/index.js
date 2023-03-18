import {useSelector} from 'react-redux';
import './SpotCardImage.css';
const SpotCardImage = ({spot}) => {
  const singleSpot = useSelector(state=>state.spots.singleSpot)
  return (
    <>
      <div className="spot-card-image">
            {console.log('----------------------------------SPOTDETAILS',singleSpot)}
            {/* {console.log(image)}*/}
            <img src={spot.previewImage} alt="spot-image" /> 
      </div>
    </>
  );
};
export default SpotCardImage;