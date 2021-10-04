import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_all_calendar, get_all_events } from "./CalendarAPI";

import axios from "axios";

const initialState = {
  isLoading: false,
  calendar: [],
  selectedCalendar: null,
  events: [],
  selectedEvent: null,
};
export const getCalendar = createAsyncThunk("event/getCalendar", async () => {
  return await get_all_calendar();
});

export const getEvents = createAsyncThunk("event/getEvets", async () => {
  return await get_all_events();
});

export const postEvent = createAsyncThunk(
  "event/postEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      return await axios.post(
        "http://641b-49-244-17-231.ngrok.io/api/event/", //event endpoint
        { ...eventData }
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    //reducers for event
    // createEvent: (state, action) => {
    //   state.events = [...state.events, action.payload];
    // },
    editEvent: (state, action) => {
      state.events = state.events.map((ev) =>
        ev.id === action.payload.id ? action.payload : ev
      );
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((ev) => ev.id !== action.payload);
    },
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    //to empty the list 
    emptyList: (state, action) => {
      state.calendar = [];
      state.events = [];
    },
    //reducer for unselecting event
    unselect: (state) => {
      state.selectedEvent = null;
    },
    //reducers for calendar
    createCalendar: (state, action) => {
      state.calendar = [...state.calendar, action.payload];
    },
    //selection of calendar
    selectCalendar: (state, action) => {
      state.selectedCalendar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //case for getting all the calendar
      .addCase(getCalendar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.calendar.push(...action.payload.data);
        state.isLoading = false;
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.isLoading = false;
      })
      //case for getting all the events
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events.push(...action.payload.data);
        state.isLoading = false;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
      })
      //case for posting all the events
      .addCase(postEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postEvent.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  emptyList,
  createEvent,
  editEvent,
  selectEvent,
  unselect,
  removeEvent,
  createCalendar,
  selectCalendar,
} = EventSlice.actions;

export default EventSlice.reducer;
