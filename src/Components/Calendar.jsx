import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
//full calendar packages
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
//end of full calendar packages

import CreateEvent from "./CreateEvent";
import DescribeEvent from "./DescribeEvent";
import { useDispatch } from "react-redux";
import { editEvent, selectEvent, unselect } from "../Features/Calendar/EventSlice";
import { goToAddCalendar } from "../Features/Calendar/LayoutSlice";
import { selectCalendar } from "../Features/Calendar/EventSlice";
import { getCalendar, getEvents } from "../Features/Calendar/EventSlice";
import { emptyList, eventsList } from "../Features/Calendar/EventSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state.event.calendar);

  const eventList = useSelector(eventsList);

  //for toggling create event
  const [showMenu, setShowMenu] = useState(false);
  //for selecting between create, describe, and edit menu
  const [showMode, setShowMode] = useState("Create");
  //for setting up position of pup up
  const [position, setPosition] = useState([0, 0]);
  const [start_date, setStart_date] = useState(Date.now.toLocaleString());
  const [end_date, setEnd_date] = useState(Date.now.toLocaleString());

  //for selecting calendar
  const [searchValue, setSearchValue] = useState("");
  const hanldeSarch = (e) => {
    setSearchValue(e.target.value);
  };
  //select event
  useEffect(() => {
    dispatch(emptyList());
    dispatch(getEvents());
    dispatch(getCalendar());
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

  const handleEventChange = (e) => {
    const newEvent = {
      id: parseInt(e.event.id),
      title: e.event._def.title,
      allDay: e.oldEvent.allDay,
      color: e.oldEvent.backgroundColor,
      start: e.event._instance.range.start,
      end: e.event._instance.range.end,
      Participation: e.oldEvent.extendedProps.Participation,
      description: e.event.extendedProps.description,
    };
    console.log(newEvent);
    dispatch(editEvent(newEvent));
  };

  const handleCalendarSelect = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Add Calendar") {
      dispatch(goToAddCalendar());
    } else {
      dispatch(selectCalendar(calendar[e.target.value]));
    }
  };

  //view dayGridMonth timeGridWeek listWeek dayGridWeek
  const views = ["dayGridMonth", "timeGridWeek", "listWeek", "dayGridWeek"];
  const [view, setView] = useState("dayGridMonth");
  const hanldeViewChange = (e) => {
    if (e.target.value === "dayGridMonth") {
      setView(e.target.value);
    } else if (e.target.value === "timeGridWeek") {
      setView(e.target.value);
    } else if (e.target.value === "listWeek") {
      setView(e.target.value);
    } else if (e.target.value === "dayGridWeek") {
      setView(e.target.value);
    }
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
              label="Create New"></CreateEvent>
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
              }}></DescribeEvent>
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
              label="Edit"></CreateEvent>
          )}
        </>
      )}
      <div className="header-sel-inp">
        <select className="" onChange={hanldeViewChange}>
          {views.map((view, id) => (
            <option value={view} key={id}>
              {view}
            </option>
          ))}
        </select>
        <select className="" onChange={handleCalendarSelect}>
          {calendar.map((cal, id) => (
            <option value={id} key={id}>
              {cal.name}
            </option>
          ))}
          <option value="Add Calendar">Add Calendar</option>
        </select>
        <input type="text" name="search" value={searchValue} placeholder="Search" onChange={hanldeSarch}></input>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView={view}
        changeView={view}
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
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        weekNumberClassNames="weekNum"
        weekNumbers={true}
        weekNumberFormat={{ week: "numeric" }}
        events={eventList}
        editable={true}
        selectable={true}
        eventResize={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventDurationEditable={true}
        eventResizableFromStart={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
      />
    </>
  );
};

export default Calendar;
