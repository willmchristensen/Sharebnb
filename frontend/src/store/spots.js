const LOAD = "spots/LOAD";

const load = (list) => ({
    type: LOAD,
    list,
});

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

const initialState = {
    allSpots: []
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:{
            const newState = {...state};
            action.list.forEach((spot) => {
                newState[spot.id] = spot;
            });
            return newState
        };
        default:
            return state;
    }
};

export default spotsReducer;
