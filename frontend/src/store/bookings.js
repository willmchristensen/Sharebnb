import { csrfFetch } from "./csrf";
// ----------------START action string type literals--------------------
const LOAD_BOOKINGS = 'api/bookings/LOAD_BOOKINGS'
const EDIT_BOOKING = "api/bookings/EDIT_BOOKING"
const LOAD_CURRENT = "/api/bookings/LOAD_CURRENT"
const CREATE_BOOKING = "api/bookings/CREATE_BOOKING"
const DELETE_ONE ="spots/DELETE_ONE"
// ----------------END action string type literals--------------------
// -----------------------START action creator--------------------------
const loadCurrent = (data) => ({
    type:   LOAD_CURRENT,
    payload: data,
});
const updateBooking = (data) => ({
    type: EDIT_BOOKING,
    payload: data
});
const createBooking = (data) => ({
    type: CREATE_BOOKING,
    payload: data
});
const loadAllBookings = (data) => ({
    type:LOAD_BOOKINGS,
    payload: data
});
const deleteOne = (id) => ({
    type: DELETE_ONE,
    payload: id
});
// -----------------------END action creator--------------------------
// -----------------------START normalize data---------------------------
const normalize = (data) => data.reduce((obj,ele) => ({
    ...obj,
    [ele.id]: ele
}), {});
// ---------------------------END normalize data---------------------------
// ------------ THUNKS: thunk action creators allow us to make async calls  -----------
export const loadUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);
    if(response.ok){
        const data = await response.json();
        const userBookings = normalize(data.Bookings);
        console.log('------------------------------loadUserBookings thunk response',userBookings);
        dispatch(loadCurrent(userBookings));
        return response;
    }
};
export const editBooking = (payload) => async (dispatch) => {
    const {id, data} = payload;
    const response = await csrfFetch(`/api/bookings/${id}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if(response.ok){
        const booking = await response.json();
        console.log(booking);
        dispatch(updateBooking(booking));
        return booking;
    }
};
export const createOneBooking = (payload) => async (dispatch) => {
    console.log('------------------------------CREATE one booking thunk: payload:', payload);
    const response = await csrfFetch("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });
    console.log('------------------------------CREATE one booking thunk: response:', response);
    if (response.ok) {
        const booking = await response.json();
        dispatch(createBooking(booking));
        return booking;
    }
};
export const getAllBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/all`);

    if (response.ok) {
        const data = await response.json();
        const allBookings = normalize(data.Bookings);
        dispatch(loadAllBookings(allBookings));
        return response;
    }
};
export const deleteOneBooking = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/${id}`, {
            method: "DELETE",
        });
        if(response.ok){
            const result = await response.json();
            console.log('THUNK:------------------',id,result)
            return dispatch(deleteOne(id));
        }
    } catch (error) {
        throw error;
    }
};
const initialState = {
    allBookings:{},
    user: {}
};
const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS:
            return {
                ...state,
                allBookings: action.payload
            };
        case LOAD_CURRENT: {
            const newState = {...state, user:{...state.user}};
            newState.user = {...action.payload}
            return newState;
        }
        case EDIT_BOOKING: {
            const newState = { ...state, user: { ...state.user } };
            newState.events[action.payload.id] = action.payload
            return newState
        }
        case CREATE_BOOKING: {
            console.log('------------------------------inside CREATE booking reducer: create_booking' );
            const newState = {...state, allBookings: {...state.allBookings}};
            newState.allBookings[action.payload.id] = {...newState.allBookings[action.payload.id],...action.payload};
            return newState;
        }
        case DELETE_ONE: {
            const newState = {...state, allSpots: {...state.allBookings}, user: {...state.user}};
            delete newState.allBookings[action.payload];
            delete newState.user[action.payload];
            return newState;
        }
        default:
            return state;
    }
};
export default bookingsReducer;