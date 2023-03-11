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
        case LOAD:{ 
            const newState = {
                ...state,
                spots: action.payload 
            }
            return {
                ...newState
            }
        }
        default:
            return state;
    }
};

export default spotsReducer;
