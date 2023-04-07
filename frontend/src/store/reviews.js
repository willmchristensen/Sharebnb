import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect'
// ----------------START action string type literals--------------------
const SPOTREVIEWS = "/api/spots/:spotId/SPOTREVIEWS"
const LOAD_CURRENT = "/api/reviews/LOAD_CURRENT"
const CREATE_REVIEW = "/api/reviews/new"
const DELETE_ONE ="spots/DELETE_ONE"
// ----------------END action string type literals--------------------
// -----------------------START action creator--------------------------
const loadReviews = (data) => ({
    type: SPOTREVIEWS,
    payload: data,
});
const loadCurrent = (data) => ({
    type:   LOAD_CURRENT,
    payload: data,
});
const createReview = (review) => ({
    type: CREATE_REVIEW,
    review,
});
const deleteOne = (id) => ({
    type: DELETE_ONE,
    payload: id
});
// -----------------------END action creator--------------------------
// -----------------------START normalize data---------------------------
const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});
// ---------------------------END normalize data---------------------------
// --------------------- THUNKS: thunk action creators allow us to make async calls  ---------------------
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
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });
    if(response.ok){
        const review = await response.json();
        review.User = user;
        dispatch(createReview(review));
        return review;
    }
}
export const deleteOneReview = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/${id}`, {
          method: "DELETE",
        });
        if(response.ok){
            const result = await response.json();
            return dispatch(deleteOne(id));
        }
      } catch (error) {
        throw error;
      }
}
// --------------------- END OF THUNKS  ---------------------
// ---------------------memoization---------------------
export const deleteReviewsMemo = createSelector(
    state=>state.reviews.user,
    state => state.session.user,
    (reviews,sessionUser) => {
        const allReviews = Object.values(reviews);
        return {allReviews,sessionUser}
    }
);
// ---------------------memoization---------------------
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
        case DELETE_ONE: {
            const newState = {...state, spot: {...state.spot}, user: {...state.user}};
            delete newState.user[action.payload];
            delete newState.spot[action.payload];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
