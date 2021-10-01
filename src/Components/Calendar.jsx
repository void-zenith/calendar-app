import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateEvent from "./CreateEvent";
import DescribeEvent from "./DescribeEvent";
import { useDispatch } from "react-redux";
import { selectEvent, unselect } from "../Features/Calendar/EventSlice";
const Calendar = () => {
  const event = useSelector((state) => state.event.events);
  const dispatch = useDispatch();
  //for toggling create event
  const [showMenu, setShowMenu] = useState(false);
  //for selecting between create, describe, and edit menu
  const [showMode, setShowMode] = useState("Create");
  //for setting up position of pup up
  const [position, setPosition] = useState([0, 0]);

  const [start_date, setStart_date] = useState(Date.now.toLocaleString());
  const [end_date, setEnd_date] = useState(Date.now.toLocaleString());

  //for selecting calendar
  const [calendarChoose, setCalendarChoose] = useState("Default");
  //for searching input
  const [searchValue, setSearchValue] = useState("");
  const hanldeSarch = (e) => {
    setSearchValue(e.target.value);
  };
  //select event
  useEffect(() => {
    dispatch(unselect());
  }, []);
  const setCreateEvent = ([posX, posY]) => {
    setPosition([posX, posY]);
    setShowMenu(true);
  };
  const handleDateClick = (e) => {
    setStart_date(e.dateStr);
    setEnd_date(e.dateStr);
    setCreateEvent([e.jsEvent.x, e.jsEvent.y]);
  };

  const handleEventClick = (e) => {
    let event = e.event.toPlainObject();
    dispatch(selectEvent(event));
    setCreateEvent([e.jsEvent.x, e.jsEvent.y]);
    setShowMode("Describe");
  };

  const handleCalendarSelect = (e) => {
    setCalendarChoose(e.target.value);
  };
  return (
    <>
      {showMenu && (
        <>
          {showMode === "Create" && (
            <CreateEvent
              start_date={start_date}
              end_date={end_date}
              close={() => {
                setShowMenu(false);
              }}
              position={position}
              label="Create New"
            ></CreateEvent>
          )}
          {showMode === "Describe" && (
            <DescribeEvent
              position={position}
              close={() => {
                setShowMode("Create");
                setShowMenu(false);
              }}
              openEdit={() => {
                setShowMode("Edit");
              }}
            ></DescribeEvent>
          )}
          {showMode === "Edit" && (
            <CreateEvent
              start_date={start_date}
              end_date={end_date}
              close={() => {
                setShowMode("Create");

                setShowMenu(false);
              }}
              position={position}
              label="Edit"
            ></CreateEvent>
          )}
        </>
      )}
      <div className="header-sel-inp">
        <select onChange={handleCalendarSelect}>
          <option value="Default">Default</option>
          <option value="Add Calendar">Add Calendar</option>
        </select>
        <input
          type="text"
          name="search"
          value={searchValue}
          placeholder="Search"
          onChange={hanldeSarch}
        ></input>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dayHeaderFormat={{
          weekday: "long",
        }}
        dayHeaderClassNames={"day-padding"}
        titleFormat={{
          month: "long",
          year: "numeric",
        }}
        height="710px"
        headerToolbar={{
          left: "prev title next",
          center: "",
          right: "",
        }}
        initialView="dayGridMonth"
        events={event}
        droppable={true}
        selectable={true}
        eventDurationEditable={true}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      ></FullCalendar>
    </>
  );
};

export default Calendar;
