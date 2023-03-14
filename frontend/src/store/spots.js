import { restoreCSRF, csrfFetch } from "./csrf";

const LOAD = "api/spots";
const LOADONE = "api/spots/:spotId"
const LOADREVIEWS = "/api/spots/:spotId/reviews"
const LOADCURRENT = "/api/spots/current"
const ADDONE = "api/spots"


const load = (data) => ({
    type: LOAD,
    payload: data,
});

const loadOne = (data) => ({
    type: LOADONE,
    payload: data,
});

const loadCurrent = (data) => ({
    type:   LOADCURRENT,
    payload: data,
})

const addOne = (data) => ({
    type: ADDONE,
    payload: data,
})

const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const data = await response.json();
        const allSpots = normalize(data.Spots);
        dispatch(load(allSpots));
    }
};

export const loadSpotDetails = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    if(response.ok){
        const data = await response.json();
        // console.log('------------------------------data',data.Owner);
        dispatch(loadOne(data));
    }
}

export const loadUserSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`);
    // console.log('------------------------------response',response);
    if(response.ok){
        const data = await response.json();
        // console.log('------------------------------data',data);
        // dispatch(loadCurrent(data));

        const userSpots = normalize(data.Spots);
        // console.log('------------------------------userSpots', userSpots);
        dispatch(loadCurrent(userSpots));
    }
}

export const addOneSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(payload)
    });
    console.log('------------------------------RESPONSE', response);
    const data = await response.json();
    console.log('------------------------------data', data);
    dispatch(addOne(data));
    return data
}

const initialState = {
    allSpots: {},
    singleSpot:{
        SpotImages: [],
        Owner: {}
    },
    // reviews: {}
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {...state};
            newState.allSpots = {...action.payload};
            return newState;
        }
        case LOADONE: {
            const newState = {...state};
            newState.singleSpot = {...action.payload};
            newState.SpotImages = [...action.payload.SpotImages];
            newState.Owner = {...action.payload.Owner};
            return newState
        }
        // case LOADREVIEWS: {
        //     const newState = {...state};
        //     newState.reviews = {...action.payload.Reviews};
        //     return newState
        // }
        case LOADCURRENT: {
            const newState = {...state};
            newState.allSpots = {...action.payload};
            return newState;
        }
        case ADDONE:{
            const newState = {...state};
            console.log(action.payload);
            newState.allSpots[action.payload.id] = {...action.payload}
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
