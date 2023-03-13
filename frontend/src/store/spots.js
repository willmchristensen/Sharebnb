const LOAD = "api/spots";
const LOADONE = "api/spots/:spotId"

const load = (data) => ({
    type: LOAD,
    payload: data,
});

const loadOne = (data) => ({
    type: LOADONE,
    payload: data,
});

// const loadReviews = 

const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const data = await response.json();
        const allSpots = normalize(data.Spots);
        // console.log('-------datadatadatadata----',data.Spots);
        // console.log('-----------',allSpots);
        dispatch(load(allSpots));
    }
};

export const loadSpotDetails = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);
    if(response.ok){
        const data = await response.json();
        // const spot = normalize(data);
        // console.log('------------------------------data', data);
        // console.log('------------------------------spot',spot);
        dispatch(loadOne(data));
    }
}

// export const loadSpotReviews = (id) => async(dispatch) => {
//     const response = await fetch(`/${id}/reviews`);
//     if(response.ok){
//         const data = await response.json();
//         console.log('------------------------------data', data);
//         dispatch(loadReviews(data))
//     }
// }


const initialState = {
    allSpots: {},
    singleSpot:{},
    reviews: {},
    bookings: {},
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
            return newState
        }
        default:
            return state;
    }
};

export default spotsReducer;
