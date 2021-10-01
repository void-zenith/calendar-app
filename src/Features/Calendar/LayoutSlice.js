import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addCalendar: false,
  displayAll: true,
  displayEventMenu: false,
};
const allFalse = {
  addCalendar: false,
  displayAll: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    goToAddCalendar: () => {
      return { ...allFalse, addCalendar: true };
    },
    goToDisplayAll: () => {
      return { ...allFalse, displayAll: true };
    },
  },
});

export const { goToAddCalendar, goToDisplayAll } =
  layoutSlice.actions;
export default layoutSlice.reducer;
