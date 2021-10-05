import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import Modal from "./Modal";
import { editEvent as updateEvent, eventList, getEvents } from "../Features/Calendar/EventSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getEvents()), [dispatch]);

  const event = useSelector(eventList);

  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState({ type: "view", show: false, event: {}, properties: null });

  const editEvent = (e) => {
    console.log("Edit date change");
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
    dispatch(updateEvent(newEvent));
  };

  return (
    <>
      <div className="modal__container">
        {modal.show && (
          <Modal
            open={modal.show}
            handleClose={() => setModal({ ...modal, show: false })}
            openEdit={() => setModal({ ...modal, show: true, type: "edit" })}
            type={modal.type}
            event={modal.event}
            properties={modal.properties}
          />
        )}
      </div>

      <div className="header-sel-inp">
        {/* <select onChange={handleCalendarView}> */}
        <select onChange={(e) => console.log(e)}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
          <option value="event">Event</option>
        </select>
        <select onChange={(e) => console.log(e)}>
          <option value="Default">Default</option>
          <option value="Add Calendar">Add Calendar</option>
        </select>
        <input
          type="text"
          name="search"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}></input>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
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
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listDay",
        }}
        initialView="dayGridMonth"
        events={event}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={(e) => !modal.show && setModal({ ...modal, type: "add", show: true, event: e })}
        dateClick={(e) => !modal.show && setModal({ ...modal, type: "add", show: true, event: e })}
        eventClick={(e) => !modal.show && setModal({ ...modal, type: "view", show: true, event: e })}
        eventChange={editEvent}
        eventDurationEditable={true}
        eventResizableFromStart={true}
      />
    </>
  );
};

export default Calendar;
