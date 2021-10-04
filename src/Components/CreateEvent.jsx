import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'

import Close from '../Icons/Close'
import Button from './Button'
import Colorpicker from './Colorpicker'
import { createEvent, editEvent, unselect, removeEvent } from '../Features/Calendar/EventSlice'

const CreateEvent = ({ event, handleClose, label, start_date, end_date, close, position: [posX, posY] }) => {
  const dispatch = useDispatch()
  const selectedEvent = useSelector((state) => state.event.selected)

  const [formData, setFormData] = useState({
    title: '',
    calendar: '',
    color: 'red',
    start: start_date,
    end: end_date,
    participants: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // const handleClose = (e) => {
  //   e.preventDefault()
  //   dispatch(unselect())
  //   close()
  // }

  const handeCreateEvent = (e) => {
    e.preventDefault()
    dispatch(createEvent(formData))
    dispatch(unselect())
    close()
  }

  const handleUpdateEvent = (e) => {
    e.preventDefault()
    dispatch(editEvent(selectedEvent))
    dispatch(unselect())
    close()
  }

  return (
    <div
      // style={{ top: `${posY > 350 ? posY - 300 : posY}px`, left: `${posX > 780 ? posX - 550 : posX}px` }}
      className="create-event__container">
      <div className="create-event__header">
        <h1>{label} Event</h1>

        <Colorpicker />

        <select className="choose-calendar">
          <option value="calendar">Calendar</option>
          <option value="calendar">User</option>
        </select>
        <Close onClick={handleClose} />
      </div>

      <div className="create-event__body">
        <form>
          <input
            className="input-field input-eventTitle"
            placeholder="Event Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />

          <div className="datepicker-container">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="date-picker date-picker__start"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="Date-picker"
                name="start"
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, end: e })}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}></KeyboardDatePicker>
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="date-picker date-picker__start"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="Date-picker"
                name="end"
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e })}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}></KeyboardDatePicker>
            </MuiPickersUtilsProvider>
          </div>

          <input
            className="input-field input-participants"
            placeholder="Participants"
            name="participants"
            type="text"
            value={formData.participants}
            onChange={handleChange}
          />

          <textarea
            className="input-field__description"
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            type="text"
          />

          <div className="button-form__container">
            {label === 'Create New' ? (
              <Button onClick={handleClose} size="default" variant="outlined" label="Cancel"></Button>
            ) : (
              <Button onClick={handleClose} size="default" variant="outlined" label="Cancel Event"></Button>
            )}
            {label === 'Create New' ? (
              <Button onClick={handeCreateEvent} size="large" variant="primary" label="Create Event"></Button>
            ) : (
              <Button onClick={handleUpdateEvent} size="large" variant="primary" label="Save"></Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
