import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect'
// --------------------action string type literals--------------------
const LOAD = "spots";
const LOAD_ONE = "spots/LOAD_ONE"
const LOAD_CURRENT = "/spots/LOAD_CURRENT"
const ADD_ONE = "spots/ADD_ONE"
const DELETE_ONE ="spots/DELETE_ONE"
const ADD_IMAGE = "spots/ADD_IMAGE"
const UPDATE_SPOT = "spots/UPDATE_SPOT" 
// --------------------action string type literals--------------------
// ---------------------------action creator--------------------------
const load = (data) => ({
    type: LOAD,
    payload: data,
});

const loadOne = (data) => ({
    type: LOAD_ONE,
    data,
});

const loadCurrent = (data) => ({
    type:   LOAD_CURRENT,
    payload: data,
});

const addOne = (data) => ({
    type: ADD_ONE,
    payload: data,
});

const deleteOne = (id) => ({
    type: DELETE_ONE,
    payload: id
});

const addSpot = (data) => ({
    type: ADD_IMAGE,
    payload: data
});

const updateSpot = (data) => ({
    type: UPDATE_SPOT,
    payload: data
});
// ---------------------------action creator--------------------------

const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});

// --------------------- THUNKS: thunk action creators allow us to make async calls  ---------------------
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);
    
    if (response.ok) {
        const data = await response.json();
        const allSpots = normalize(data.Spots);
        dispatch(load(allSpots));
        return response;
    }
};

export const loadSpotDetails = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if(response.ok){
        const data = await response.json();
        dispatch(loadOne(data));
        return response;
    }
}

export const loadUserSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`);
    if(response.ok){
        const data = await response.json();
        const userSpots = normalize(data.Spots);
        dispatch(loadCurrent(userSpots));
        return data;
    }
}

export const deleteOneSpot = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${id}`, {
            method: "DELETE",
        });
        if(response.ok){
            const result = await response.json();
            console.log('THUNK:------------------',id,result)
            return dispatch(deleteOne(id));
        }
    } catch (error) {
        throw error;
    }
}

export const createOneSpot = (spot) => async (dispatch) => {
    console.log(spot);
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(addOne(spot));
        return spot;
    }
};

export const addSpotImage = (id, url, preview) => async () => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url,
            preview
        })
    });
    return response;
};

export const updateOneSpot =   (spot, images) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot)
    });
    if(response.ok){
        const spot = await response.json();
        console.log(spot);
        dispatch(addOne(spot));
        return spot;
    }
}
// --------------------- THUNKS: thunk action creators allow us to make async calls  ---------------------

const initialState = {
    allSpots: {},
    singleSpot:{
        SpotImages: [],
        Owner: {}
    },
};
// -------------------------------memoization of allspots and spot details-------------------------------
export const getEverySpot = createSelector(
    state => state.spots.allSpots,
    (spots) => {
        
    }
    allSpots => Object.values(allSpots)
);
export const getSpotDetails = createSelector(
    state => state.spots.singleSpot,
    state => state.reviews.spot,
    state => state.session.user,
    (singleSpot, reviews, sessionUser) => {
      const spotImages = singleSpot.SpotImages;
      const previewImage = spotImages[0];
      const allReviews = Object.values(reviews);
  
      return { singleSpot, spotImages, previewImage, allReviews, sessionUser };
    }
);  
// -------------------------------memoization of allspots and spot details-------------------------------
// -----------------------------------------speaks to the store-----------------------------------------
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {...state};
            newState.allSpots = action.payload;
            return newState;
        }
        case LOAD_ONE: {
            const newState = {...state};
            newState.singleSpot = {...action.data};
            return newState;
        }
        case LOAD_CURRENT: {
            const newState = {...state, allSpots: {...state.allSpots}};
            newState.allSpots = {...action.payload};
            return newState;
        }
        case ADD_ONE: {
            const newState = {...state, allSpots: {...state.allSpots}};
            newState.allSpots[action.payload.id] = {...newState.allSpots[action.payload.id],...action.payload};
            return newState;  
        }
        // case UPDATE_SPOT: {
        //     const newState = {...state, allSpots: {...state.allSpots}};
        //     newState.allSpots[action.payload.id] = {...action.payload};
        // }
        case DELETE_ONE: {
            const newState = {...state, allSpots: {...state.allSpots}};
            delete newState.allSpots[action.payload];
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
