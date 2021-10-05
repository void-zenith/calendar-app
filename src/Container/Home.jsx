import React from "react";
import { useSelector } from "react-redux";
import Calendar from "../Components/Calendar";
import AddCalendar from "../Components/AddCalendar";

import CreateEvent from "../Components/CreateEvent";
const Home = () => {
  
  const layout = useSelector((state) => state.layout);
  
  return (
    <div className="main-container">
      <div className="navbar-container">
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
