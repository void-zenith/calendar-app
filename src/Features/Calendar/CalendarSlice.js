import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    calendar: [],
    selected:null,
}

const CalendarSlice = createSlice({
    name:'calendar',
    initialState,
    reducers: {
        createCalendar: (state,action) => {
            state.calendar = [...state.calendar,action.payload];
        },
        selectCalendar: (state,action) => {
            state.selected = action.payload;
        },
        unselectCalendar: (state) => {
            state.selected = null;
        },
    }
})


export const {createCalendar, selectCalendar,unselectCalendar} = CalendarSlice.actions;

export default CalendarSlice.reducer;