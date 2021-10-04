import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import CreateEvent from './CreateEvent'
import DescribeEvent from './DescribeEvent'
import Modal from './Modal'

import { selectEvent, unselect } from '../Features/Calendar/EventSlice'
import { create } from '../Features/Calendar/CalendarAPI'
const Calendar = () => {
  const event = useSelector((state) => state.event.events)
  const dispatch = useDispatch()

  const [modal, setModal] = useState({ type: 'view', show: false, event: {}, properties: null })
  // const [position, setPosition] = useState([0, 0])

  const [start_date, setStart_date] = useState(Date.now.toLocaleString())
  const [end_date, setEnd_date] = useState(Date.now.toLocaleString())

  const [searchValue, setSearchValue] = useState('')

  const handleDateClick = (e) => {
    setStart_date(e.dateStr)
    setEnd_date(e.dateStr)
    // setCreateEvent([e.jsEvent.x, e.jsEvent.y])
  }

  const handleEventClick = (e) => {
    console.log('View event')
    let event = e.event.toPlainObject()
    // dispatch(selectEvent(event))
    // setCreateEvent([e.jsEvent.x, e.jsEvent.y])
    // setShowMode('Describe')
  }

  const addEvent = (e) => {
    console.log('Add event')
    dispatch(create(e))
  }

  return (
    <>
      {/* {showMenu && (
        <>
          {showMode === 'Create' && (
            <CreateEvent
              start_date={start_date}
              end_date={end_date}
              close={() => {
                setShowMenu(false)
              }}
              position={position}
              label="Create New"></CreateEvent>
          )}
          {showMode === 'Describe' && (
            <DescribeEvent
              position={position}
              close={() => {
                setShowMode('Create')
                setShowMenu(false)
              }}
              openEdit={() => {
                setShowMode('Edit')
              }}></DescribeEvent>
          )}
          {showMode === 'Edit' && (
            <CreateEvent
              start_date={start_date}
              end_date={end_date}
              close={() => {
                setShowMode('Create')

                setShowMenu(false)
              }}
              position={position}
              label="Edit"></CreateEvent>
          )}
        </>
      )} */}

      <div className="modal__container">
        {modal.show && (
          <Modal
            open={modal.show}
            handleClose={() => setModal({ ...modal, show: false })}
            type={modal.type}
            event={modal.event}
            addEvent={addEvent}
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
        plugins={[dayGridPlugin, interactionPlugin]}
        dayHeaderFormat={{
          weekday: 'long',
        }}
        dayHeaderClassNames={'day-padding'}
        titleFormat={{
          month: 'long',
          year: 'numeric',
        }}
        height="710px"
        headerToolbar={{
          left: 'prev title next',
          center: 'dayGridMonth,timeGridWeek,timeGridDay, eventGrid',
          right: '',
        }}
        initialView="dayGridMonth"
        events={event}
        droppable={true}
        selectable={true}
        select={(e) => !modal.show && setModal({ ...modal, type: 'add', show: true, event: e })}
        dateClick={(e) => !modal.show && setModal({ ...modal, type: 'add', show: true, event: e })}
        eventDurationEditable={true}
        eventClick={(e) => !modal.show && setModal({ ...modal, type: 'view', show: true, event: e })}
        // eventClick={handleEventClick}
        editable={true}
        dayMaxEvents={true}
      />
    </>
  )
}

export default Calendar
