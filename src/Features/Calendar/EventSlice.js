import * as api from './CalendarAPI'

import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { events } from './Event.data'
import { get_all_calendar } from './CalendarAPI'

const initialState = {
  isLoading: false,
  calendar: [],
  events: [...events],
  selected: null,
}
export const getCalendar = createAsyncThunk('event/getCalendar', async () => {
  return await get_all_calendar()
})

export const postEvent = createAsyncThunk('event/getCalendar', async (event) => {
  return await api.create(event)
})

const EventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    createEvent: (state, action) => {
      state.events = [...state.events, action.payload]
    },
    editEvent: (state, action) => {
      console.log('actions', action.payload)
      state.events = state.events.map((ev) => (ev.id === action.payload.id ? action.payload : ev))
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((ev) => ev.id !== action.payload)
    },
    selectEvent: (state, action) => {
      state.selected = action.payload
    },
    unselect: (state) => {
      state.selected = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.events.push(...action.payload.data)
        console.log(events)
        state.isLoading = false
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.isLoading = true
      })
  },
})

export const { createEvent, editEvent, selectEvent, unselect, removeEvent } = EventSlice.actions

export const eventList = (state) => state.event.events

export default EventSlice.reducer
