function SpotReviews({ numReviews, avgStarRating }) {

    return (
        <>
            <div className="spot-details-reviews-content-stars">
                <i class="fas fa-star"></i>
                {
                    numReviews > 0 &&
                    <>
                        <h3>
                            {Number(avgStarRating).toFixed(1)}
                        </h3>
                        <span id="stars-label">Stars</span>
                        <div className="dot">
                            <i class="fas fa-dot-circle" id="dot"></i>
                        </div>
                    </>
                }
            </div>
            {
                numReviews === 1 ?
                    (
                        <h3>
                            {Number(numReviews).toFixed(0)} review
                        </h3>
                    ) :
                    numReviews > 0 ?
                        (
                            <h3>
                                {Number(numReviews).toFixed(0)} reviews
                            </h3>
                        ) :
                        (
                            <h3>
                                "New"
                            </h3>
                        )
            }
        </>
    )

}
export default SpotReviews;