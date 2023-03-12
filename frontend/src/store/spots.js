const LOAD = "api/spots";

const load = (allSpots) => ({
    type: LOAD,
    payload: allSpots,
});

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const allSpots = await response.json();
        dispatch(load(allSpots));
    }
};


const initialState = {
    allSpots: []
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {...state,};
            newState.allSpots = {...action.payload.Spots};
            return newState
        }
        // case LOAD:{ 
        //     const newState = {
        //         ...state,
        //         spots: action.payload 
        //     }
        //     console.log('--------------- ALLSPOTS IN REDUCER --------------',{newState})
        //     return {
        //         ...newState
        //     }
        // }
        default:
            return state;
    }
};

export default spotsReducer;
