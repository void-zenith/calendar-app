import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { events } from "./Event.data";
import { get_all_calendar } from "./CalendarAPI";
import axios from "axios";

const initialState = {
  isLoading: false,
  calendar: [],
  events: [...events],
  selected: null,
};
export const getCalendar = createAsyncThunk("event/getCalendar", async () => {
  return await get_all_calendar();
});

const postEvent = createAsyncThunk("event/postEvent", async (object) => {
  return await axios.post("http://b786-49-244-40-252.ngrok.io/api/calendar/");
});
const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events = [...state.events, action.payload];
    },
    editEvent: (state, action) => {
      state.events = state.events.map((ev) =>
        ev.id === action.payload.id ? action.payload : ev
      );
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((ev) => ev.id !== action.payload);
    },
    selectEvent: (state, action) => {
      state.selected = action.payload;
    },
    unselect: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.events.push(...action.payload.data);
        console.log(events);
        state.isLoading = false;
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const { createEvent, editEvent, selectEvent, unselect, removeEvent } =
  EventSlice.actions;

export default EventSlice.reducer;