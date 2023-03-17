import './LargeCardImage.css'

const LargeCardImage = ({image}) => {
  return (
    <div className="large-spot-card-image">
        <img src={image.url} alt="hero-image" />
    </div>
  );
};

export default LargeCardImage;