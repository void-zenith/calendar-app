import React from "react"
import Close from "../Icons/Close"
import Edit from "../Icons/Edit"

const DescribeEvent = ({ event, handleClose, openEdit }) => {
  const eventDetails = event.event
  // posX = posX - 720
  // posY = posY - 300
  return (
    <div className='describe-event__container'>
      <div className='describe-event__header'>
        <div className='describe-event__heading'>
          <h1 className='event-duration'>Event</h1>
          <h6 className='event-calendar'>myCalendar</h6>
        </div>
        <div className='describe-event__button'>
          <Edit onClick={openEdit}></Edit>
          <Close onClick={handleClose}></Close>
        </div>
      </div>
      {/* <div style={{ background: selectedEvent.backgroundColor }} className="color-container"></div> */}
      <div style={{ background: "red" }} className='color-container'></div>
      <div className='describe-event__body'>
        <div className='from-to__container'>
          <h2>
            From: <span className='date'>{eventDetails._instance.range.start.toDateString()}</span>
          </h2>
          <h2>
            TO: <span className='date'>{eventDetails._instance.range.end.toDateString()}</span>
          </h2>
        </div>
        <div className='participation__container'>
          <h2>Participation</h2>
          {eventDetails.extendedProps.participants &&
            eventDetails.extendedProps.participants.map((ev, id) => (
              <div className='partFlex' key={id}>
                <p className='paraFlex'>{ev.email}</p>
              </div>
            ))}
        </div>
        <div className='description__container'>
          <h2>Description</h2>
          <p>{eventDetails.extendedProps.description}</p>
        </div>
      </div>
    </div>
  )
}

export default DescribeEvent
