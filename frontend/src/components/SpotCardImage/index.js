import './SpotCardImage.css';
const SpotCardImage = ({image}) => {
  return (
    <>
      <div className="spot-card-image">
            <img src={image.url} alt="spot-image" />
      </div>
    </>
  );
};
export default SpotCardImage;