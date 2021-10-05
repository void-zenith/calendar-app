import React from "react";
import { useSelector } from "react-redux";
import Calendar from "../Components/Calendar";
import AddCalendar from "../Components/AddCalendar";
//for icons
import Print from "../Icons/Print";

const Home = () => {
  const layout = useSelector((state) => state.layout);
  const hanldeClick = () => {
    console.log("print")
  }
  return (
    <div className="main-container">
      <div className="navbar-container">
        <Print onClick={hanldeClick}></Print>
      </div>
      <div className="body-container">
        <div className="left-container"></div>
        <div className="calendar-container">
          {layout.displayAll && <Calendar></Calendar>}
          {layout.addCalendar && <AddCalendar></AddCalendar>}
        </div>
        <div className="right-container"></div>
      </div>
    </div>
  );
};

export default Home;
