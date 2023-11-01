import './BookingImage.css'

function BookingImage({image}) {
    const defaultImg = "https://static.thenounproject.com/png/4974686-200.png";
    const handleImageError = (event) => {
        event.target.src = defaultImg;
    }
    return (
        <>
            <div className="booking-image-container">
                <img src={image} alt="spot-image" onError={handleImageError} />
            </div>
        </>
    );
}

export default BookingImage;