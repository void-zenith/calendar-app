import { configureStore } from '@reduxjs/toolkit'
import EventSlice from '../Features/Calendar/EventSlice'
import LayoutSlice from '../Features/Calendar/LayoutSlice'

const store = configureStore({
  reducer: { layout: LayoutSlice, event: EventSlice },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
