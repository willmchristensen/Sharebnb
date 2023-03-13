import {useEffect, useState} from 'react';
import './stars.css'

function StarsRatingInput(rating) {

 // const handleClick = (newRating) => {
 //    onChange(newRating);
 //  }
  // TODO: ACTIVERATING
  const [activeRating,setActiveRating] = useState({rating});
  const starClass = activeRating >= 1 ? 'filled-star' : 'empty-star'
 //  // useEffect(() => {
 //  //   setActiveRating()
 //  // }, [activeRating])
  return (
   <div className="rating-input">
       <div 
        className='filled-star'
        //  className={activeRating >= 1 ? 'filled' : 'empty'} 
        //  onClick={()=>handleClick()}
       >
        <i class="fal fa-stars"></i>
       </div>
       <div 
        //  className={activeRating >= 2 ? 'filled' : 'empty'}
        //  onClick={()=>onChange({activeRating})}
       >
         <i 
           className="fa-regular fa-star"
          //  onMouseEnter={()=>setActiveRating(2)}
          //  onMouseLeave={() => setActiveRating(rating)}
         ></i>
       </div>
       <div 
        //  className={activeRating >= 3 ? 'filled' : 'empty'}
        //  onClick={()=>onChange({activeRating})}
       >
         <i 
           className="fa-regular fa-star"
          //  onMouseEnter={()=>setActiveRating(3)}
          //  onMouseLeave={() => setActiveRating(rating)}
         ></i>
       </div>
       <div 
        //  className={activeRating >= 4 ? 'filled' : 'empty'}
        //  onClick={()=>onChange({activeRating})}
       >
         <i 
           className="fa-regular fa-star"
          //  onMouseEnter={()=>setActiveRating(4)}
          //  onMouseLeave={() => setActiveRating(rating)}
         ></i>
       </div>
       <div 
        //  className={activeRating >= 5 ? 'filled' : 'empty'}
        //  onClick={()=>onChange({activeRating})}
       >
         <i 
           className="fa-regular fa-star"
          //  onMouseEnter={()=>setActiveRating(5)}
          //  onMouseLeave={() => setActiveRating(rating)}
         ></i>
       </div>
   </div>
  ); 
};

export default StarsRatingInput;