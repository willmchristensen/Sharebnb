const LOAD = "api/spots";

const load = (spots) => ({
    type: LOAD,
    payload: spots,
});

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const allSpots = await response.json();
        // console.log(allSpots)
        dispatch(load(allSpots));
    }
};

const initialState = {
    spots: []
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:  
            return {
                ...state,
                spots: action.payload
            }
        default:
            return state;
    }
};

export default spotsReducer;
