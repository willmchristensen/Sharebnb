const SPOTREVIEWS = "/api/spots/:spotId/reviews"

const loadReviews = (data) => ({
    type: SPOTREVIEWS,
    payload: data,
});

const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});

export const loadSpotReviews = (id) => async (dispatch) => {
 const response = await fetch(`/api/spots/${id}/reviews`);
 if(response.ok){
     const data = await response.json();
     const reviews = normalize(data.Reviews);
     dispatch(loadReviews(reviews));
 }
}

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOTREVIEWS: {
            const newState = {...state};
            newState.spot = {...action.payload};
            return newState
        }
        default:
            return state;
    }
};

export default reviewsReducer;
