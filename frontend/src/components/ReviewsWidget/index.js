const ReviewsWidget = ({spot}) => {
  return (
    <div className="reviews-widget">
        <i class="fas fa-star"></i>
        {
        spot.numReviews > 0 &&
            <>
                <h3>{Number(spot.avgStarRating).toFixed(1)}
                </h3>
                <div className="dot">
                    <i class="fas fa-dot-circle" id="dot"></i>
                </div>
            </>
        }
        {
        spot.numReviews === 1 ?
        (
            <h3>
                {Number(spot.numReviews).toFixed(0)} review
            </h3>
        ) : spot.numReviews > 0 ?
        (
            <h3>
                {Number(spot.numReviews).toFixed(0)} reviews
            </h3>
        ) :
        (
            <h3>
                "New"
            </h3>
        )
        }
    </div>
  );
};

export default ReviewsWidget;
