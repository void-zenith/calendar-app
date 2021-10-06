import * as api from "./CalendarAPI"

import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
// import { events } from "./Event.data"

const initialState = {
  isLoading: false,
  error: false,
  // events: [...events],
  events: [],
}

export const getAllEvents = createAsyncThunk("event/get", async (id) => {
  return await api.getCalendarEvents(id)
})

export const createEvent = createAsyncThunk("event/create", async (event) => {
  return await api.create(event)
})
export const editEvent = createAsyncThunk("event/patch", async (event, id) => {
  return await api.edit(event, id)
})
export const deleteEvent = createAsyncThunk("event/delete", async (id) => {
  await api.remove(id)
  return id
})

const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clear: (state) => {
      state.events = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.events = action.payload.data.events
        state.isLoading = false
      })
      .addCase(getAllEvents.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })

      // Create
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false
        // state.events = [...state.events, action.payload.data]
        state.events.push(action.payload.data)
      })
      .addCase(createEvent.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })

      // Update
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false
        // const newEvents = state.events.map((ev) => (ev.id === action.payload.data.id ? action.payload.data : ev))
        state.events = state.events.map((ev) => (ev.id === action.payload.data.id ? action.payload.data : ev))
      })
      // state.events = [...state.events, action.payload]
      .addCase(editEvent.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })

      // Delete
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.events = state.events.filter((ev) => ev.id !== action.payload)
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })
  },
})

export const { clear } = EventSlice.actions

export const eventList = (state) => state.event.events

export const eventsLoading = (state) => state.calendar.isLoading
export const eventError = (state) => state.calendar.error

export default EventSlice.reducer
