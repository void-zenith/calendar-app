import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import FullCalendar from "@fullcalendar/react"
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import { getCalendar, calendarList, calendarLoading } from "../Features/Calendar/CalendarSlice"

import Modal from "./Modal"
import { editEvent as updateEvent, eventList, getAllEvents } from "../Features/Calendar/EventSlice"

const Calendar = ({ history }) => {
  const [calendar, setSalendar] = useState(2)
  const dispatch = useDispatch()

  useEffect(() => dispatch(getCalendar()), [dispatch])
  const calendars = useSelector(calendarList)
  const loading = useSelector(calendarLoading)
  useEffect(() => dispatch(getAllEvents(calendar)), [dispatch, calendar])

  const event = useSelector(eventList)

  const [searchValue, setSearchValue] = useState("")
  const [view, setView] = useState("dayGridMonth")
  const [modal, setModal] = useState({ type: "view", show: false, event: {}, properties: null })

  const editEvent = (e) => {
    console.log("Edit date change")
    const newEvent = {
      id: parseInt(e.event.id),
      title: e.event._def.title,
      allDay: e.oldEvent.allDay,
      color: e.oldEvent.backgroundColor,
      start: e.event._instance.range.start,
      end: e.event._instance.range.end,
      participants: e.oldEvent.extendedProps.participants,
      description: e.event.extendedProps.description,
      calendar: calendar,
    }
    console.log(newEvent, e)
    dispatch(updateEvent(newEvent))
  }

  return (
    <>
      <div className='modal__container'>
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

      <div className='header-sel-inp'>
        {/* <select onChange={handleCalendarView}> */}
        <select onChange={(e) => setView(e.target.value)}>
          <option value='dayGridMonth'>Month</option>
          <option value='timeGridWeek'>Week</option>
          <option value='timeGridDay'>Day</option>
          <option value='listDay'>Event</option>
        </select>
        <select onChange={(e) => setSalendar(e.target.value)}>
          {!loading &&
            calendars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        <input
          type='text'
          name='search'
          value={searchValue}
          placeholder='Search'
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
        height='710px'
        headerToolbar={{
          left: "prev title next",
          center: "",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listDay",
        }}
        initialView='dayGridMonth'
        views={view}
        events={event.filter((val) => val.title.toLowerCase().includes(searchValue.toLowerCase()))}
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
  )
}

export default Calendar
