const LOAD = "spots/LOAD";

const load = (allSpots) => ({
    type: LOAD,
    allSpots,
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
        case LOAD:
            const allSpots = {};
            action.allSpots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            return {
                ...allSpots,
                ...state,            
            };
        default:
            return state;
    }
};

export default spotsReducer;
