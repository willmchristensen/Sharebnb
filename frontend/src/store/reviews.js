import { restoreCSRF, csrfFetch } from "./csrf";
const SPOTREVIEWS = "/api/spots/:spotId/SPOTREVIEWS"
const LOAD_CURRENT = "/api/reviews/LOAD_CURRENT"
const CREATE_REVIEW = "/api/reviews/new"


const loadReviews = (data) => ({
    type: SPOTREVIEWS,
    payload: data,
});

const loadCurrent = (data) => ({
    type:   LOAD_CURRENT,
    payload: data,
});

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review,
    }
}

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
    if(response.ok){
        const data = await response.json();
        const userReviews = normalize(data.Reviews);
        dispatch(loadCurrent(userReviews));
    }
}

export const createOneReview = (review,spotId,user) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    });
    if(response.ok){
        const review = await response.json();
        review.User = user;
        dispatch(createReview(review));
        return review;
    }
}

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOTREVIEWS: {
            const newState = {...state, spot:{...state.spot}};
            newState.spot = {...action.payload};
            return newState
        }
        case LOAD_CURRENT: {
            const newState = {...state, user:{...state.user}};
            newState.user = {...action.payload}
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot:{...state.spot}};
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
