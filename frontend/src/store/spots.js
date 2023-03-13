const LOAD = "api/spots";

const load = (allSpots) => ({
    type: LOAD,
    payload: allSpots,
});


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


const initialState = {
    allSpots: {},
    singleSpot:{}
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {...state};
            newState.allSpots = {...action.payload};
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
