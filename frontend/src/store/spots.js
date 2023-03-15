import { csrfFetch } from "./csrf";

const LOAD = "spots";
const LOAD_ONE = "spots/LOAD_ONE"
const LOAD_CURRENT = "/spots/LOAD_CURRENT"
const ADD_ONE = "spots/ADD_ONE"
const DELETE_ONE ="spots/DELETE_ONE"
const ADD_IMAGE = "spots/ADD_IMAGE"

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
});

const addOne = (data) => ({
    type: ADD_ONE,
    payload: data,
});

const deleteOne = (data) => ({
    type: DELETE_ONE,
    payload: data
});

const addSpot = (data) => ({
    type: ADD_IMAGE,
    payload: data
});
// /:spotId/images

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

// export const addOneSpot = (data) => async (dispatch) => {
//     try {
//         const response = await csrfFetch(`/api/spots`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         const spot = await response.json();
//         if(spot.ok){
//             dispatch(addOne(spot));
//             return spot;
//         }
//       } catch (error) {
//         throw error;
//       }
// }

export const deleteOneSpot = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${id}`, {
          method: "DELETE",
        });
        if(response.ok){
            const result = await response.json();
            dispatch(deleteOne(result));
            console.log('------------------------------res',result);
            // console.log('------------------------------',response);
            // return spot;
        }
      } catch (error) {
        throw error;
      }
}

export const createOneSpot = (spot, images) => async (dispatch) => {
    console.log(spot,images);
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
    });
    if(response.ok){
        const spot = await response.json();
        spot.SpotImages = [];
        
        images.forEach(async (img) => {
            console.log(img);
            const imageRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(img)
            });
            const image = await imageRes.json();
            spot.SpotImages.push(image);
        });

        dispatch(addSpot(spot))
        return spot;
    };
};

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
            return newState;
        }
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
            return newState;
        }
        case ADD_IMAGE: {
            const newState = {...state};
            newState.singleSpot[action.payload.id] = {...action.payload};
            return newState;  
        }
        default:
            return state;
    }
};

export default spotsReducer;
