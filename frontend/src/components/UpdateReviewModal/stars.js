import {useEffect, useState} from 'react';
import './stars.css'

function StarsRatingInput({changeStars}) {

 // const handleClick = (newRating) => {
 //    onChange(newRating);
 //  }
  // TODO: ACTIVERATING => rating in backen
  // const [activeRating,setActiveRating] = useState({rating});
  const [activeRating,setActiveRating] = useState(0);
  let rating = 5;
  let empty = <i className="far fa-star"></i>;
  let filled = <i className="fas fa-star"></i>;
 //  // useEffect(() => {
 //  //   setActiveRating()
 //  // }, [activeRating])
  return (
    <div className="stars">
      <div 
        className="star"   
        onMouseEnter={() => setActiveRating(1)}
        onMouseLeave={() => setActiveRating(rating)}
        onClick={() => changeStars(1)}
      >
        {activeRating >= 1 ? filled : empty}
      </div>
      <div 
        className="star"   
        onMouseEnter={() => setActiveRating(2)}
        onMouseLeave={() => setActiveRating(rating)}
        onClick={() => changeStars(2)}
      >
        {activeRating >= 2 ? filled : empty}
      </div>
      <div 
        className="star"   
        onMouseEnter={() => setActiveRating(3)}
        onMouseLeave={() => setActiveRating(rating)}
        onClick={() => changeStars(3)}
      >
        {activeRating >= 3 ? filled : empty}
      </div>
      <div 
        className="star"   
        onMouseEnter={() => setActiveRating(4)}
        onMouseLeave={() => setActiveRating(rating)}
        onClick={() => changeStars(4)}
      >
        {activeRating >= 4 ? filled : empty}
      </div>
      <div 
        className="star"   
        onMouseEnter={() => setActiveRating(5)}
        onMouseLeave={() => setActiveRating(rating)}
        onClick={() => changeStars(5)}
      >
        {activeRating >= 5 ? filled : empty}
      </div>
    </div>
  ); 
};

export default StarsRatingInput;