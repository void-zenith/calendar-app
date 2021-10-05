import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_all_calendar, get_all_events, post_event, cancel_event, edit_event } from "./CalendarAPI";

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

export const getEvents = createAsyncThunk("event/getEvents", async () => {
  return await get_all_events();
});

export const postEvent = createAsyncThunk("event/postEvent", async (eventData) => {
  return await post_event(eventData);
});

export const editEvent = createAsyncThunk("event/editEvent", async (eventData) => {
  return await edit_event(eventData);
});
export const cancelEvent = createAsyncThunk("event/cancelEvent", async (id) => {
  return await cancel_event(id);
});

const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
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
      })
      //case for canceling the selected event
      .addCase(cancelEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelEvent.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(cancelEvent.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { emptyList, selectEvent, unselect, createCalendar, selectCalendar } = EventSlice.actions;

export const eventList = (state) => state.event.events;

export default EventSlice.reducer;
