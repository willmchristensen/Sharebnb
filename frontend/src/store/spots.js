import { csrfFetch } from "./csrf";

const LOAD = "spots";
const LOAD_ONE = "spots/LOAD_ONE"
const LOAD_CURRENT = "/spots/LOAD_CURRENT"
const ADD_ONE = "spots/ADD_ONE"
const DELETE_ONE ="spots/DELETE_ONE"

const load = (data) => ({
    type: LOAD,
    payload: data,
});

const loadOne = (data) => ({
    type: LOAD_ONE,
    payload: data,
});

const loadCurrent = (data) => ({
    type:   LOAD_CURRENT,
    payload: data,
})

const addOne = (data) => ({
    type: ADD_ONE,
    payload: data,
})

const deleteOne = (data) => ({
    type: DELETE_ONE,
    payload: data
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

export const addOneSpot = (data) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const spot = await response.json();
        if(spot.ok){
            dispatch(addOne(spot));
            return spot;
        }
      } catch (error) {
        throw error;
      }
}

export const deleteOneSpot = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        //   body: JSON.stringify(id),
        });
        const result = await response.json();
        if(result.ok){
            dispatch(deleteOne(result));
            console.log('------------------------------res',result);
            console.log('------------------------------',response);
            // return spot;
        }
      } catch (error) {
        throw error;
      }
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
        case LOAD_ONE: {
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
        case LOAD_CURRENT: {
            const newState = {...state};
            newState.allSpots = {...action.payload};
            return newState;
        }
        case ADD_ONE: {
            const newState = {...state};
            newState[action.payload.id] = {...action.payload};
            return newState;  
        }
        case DELETE_ONE: {
            const newState = {...state};
            delete newState[action.payload.id];
            return {
                ...newState
            }
        }
        default:
            return state;
    }
};

export default spotsReducer;
