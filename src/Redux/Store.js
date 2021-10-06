import { configureStore } from "@reduxjs/toolkit"
import EventSlice from "../Features/Calendar/EventSlice"
import CalendarSlice from "../Features/Calendar/CalendarSlice"
// import LayoutSlice from "../Features/Calendar/LayoutSlice"

const store = configureStore({
  reducer: { calendar: CalendarSlice, event: EventSlice },
  devTools: process.env.NODE_ENV !== "production",
})

export default store
