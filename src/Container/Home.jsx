import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "../Components/Calendar";
import AddCalendar from "../Components/AddCalendar";
import {
  goToAddCalendar,
} from "../Features/Calendar/LayoutSlice";
import CreateEvent from "../Components/CreateEvent";
const Home = () => {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);
  const hanldeAddCalendar = () => {
    dispatch(goToAddCalendar());
  };
  return (
    <div className="main-container">
      <div className="navbar-container">
        <button onClick={hanldeAddCalendar}>Add Calendar</button>
      </div>
      <div className="body-container">
        <div className="left-container"></div>
        <div className="calendar-container">
          {layout.displayAll && <Calendar></Calendar>}
          {layout.addCalendar && <AddCalendar></AddCalendar>}
          {layout.displayEventMenu && <CreateEvent></CreateEvent>}
        </div>
        <div className="right-container"></div>
      </div>
    </div>
  );
};

export default Home;
