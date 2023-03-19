import './SpotCardImage.css';
const SpotCardImage = ({image}) => {
  return (
    <>
    <div className="image-container">
      <img src={image} alt="spot-image" />
    </div>
    </>
  );
};
export default SpotCardImage;