import { restoreCSRF, csrfFetch } from "./csrf";
const SPOTREVIEWS = "/api/spots/:spotId/SPOTREVIEWS"
const LOAD_CURRENT = "/api/reviews/LOAD_CURRENT"

const loadReviews = (data) => ({
    type: SPOTREVIEWS,
    payload: data,
});

const loadCurrent = (data) => ({
    type:   LOAD_CURRENT,
    payload: data,
});

const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});

export const loadSpotReviews = (id) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${id}/reviews`);
 if(response.ok){
     const data = await response.json();
     const reviews = normalize(data.Reviews);
     dispatch(loadReviews(reviews));
 }
}

export const loadUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);
    // console.log('------------------------------response',response);
    if(response.ok){
        const data = await response.json();
        // console.log('------------------------------data',data);
        // dispatch(loadCurrent(data));

        const userReviews = normalize(data.Reviews);
        // console.log('------------------------------userSpots', userSpots);
        dispatch(loadCurrent(userReviews));
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
        case LOAD_CURRENT: {
            const newState = {...state};
            newState.user = {...action.payload}
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
