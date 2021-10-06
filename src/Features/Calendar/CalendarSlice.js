import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "./CalendarAPI"

const initialState = {
  isLoading: false,
  calendars: [],
  selected: null,
}

export const getCalendar = createAsyncThunk("event/getCalendar", async () => {
  return await api.getAllCalendar()
})

export const createCalendar = createAsyncThunk("event/createCalendar", async (data) => {
  console.log("Here")
  return await api.createCalendar(data)
})

const CalendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    selectCalendar: (state, action) => {
      state.selected = action.payload
    },
    unselectCalendar: (state) => {
      state.selected = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCalendar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.calendars = action.payload.data
        state.isLoading = false
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.isLoading = true
      })

      //
      .addCase(createCalendar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCalendar.fulfilled, (state, action) => {
        state.calendars = [...state.calendars, action.payload.data]
        state.isLoading = false
      })
      .addCase(createCalendar.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { selectCalendar, unselectCalendar } = CalendarSlice.actions

export const calendarList = (state) => state.calendar.calendars
export const calendarLoading = (state) => state.calendar.isLoading
export const calendarSelected = (state) => state.calendar.selected

export default CalendarSlice.reducer
