import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SpotCardImage.css';
import cabin from '../../images/daniel-j-schwarz-BNX4W2GDjxI-unsplash.jpg'
const SpotCardImage = (spot) => {

  // if (!allSpots) {
  //   return null;
  // }
  // FIXME: TOOLTIP VISIBILITY ON MOUSE ENTER
  // const [showToolTip, setShowToolTip] = useState(false);
  // const handleMouseEnter = () => {
  //   setShowToolTip(true)
  // }
  // const handleMouseExit = () => {
  //   setShowToolTip(false)
  // }
  // const toolTipStyling = showToolTip ? 'visible' : 'hidden';
  // console.log(toolTipStyling);
  return (
    <>
        <div className="spot-card-image" onMouseEnter={handleMouseEnter} onMouseExit={handleMouseExit}>
            <img src={cabin} alt="" />
            {/* <p style={{visibility: {toolTipStyling}}}>tooltip</p> */}
        </div>
    </>
  );
};

export default SpotCardImage;