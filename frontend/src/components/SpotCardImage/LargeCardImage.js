import './LargeCardImage.css'

const LargeCardImage = ({image}) => {
   const defaultImg = "https://static.thenounproject.com/png/4974686-200.png";
    const handleImageError = (event) => {
        event.target.src = defaultImg;
    }
  return (
    <div className="large-spot-card-image">
        <img src={image} alt="hero-image" onError={handleImageError}/>
    </div>
  );
};

export default LargeCardImage;