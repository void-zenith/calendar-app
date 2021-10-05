import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import Close from '../Icons/Close'
import Button from './Button'
import Colorpicker from './Colorpicker'
import { createEvent, editEvent } from '../Features/Calendar/EventSlice'

const CreateEvent = ({ event, handleClose, label, type }) => {
  const dispatch = useDispatch()
  console.log(event.event)
  let initState =
    type === 'add'
      ? {
          title: '',
          calendar: '',
          color: 'red',
          start: event.start,
          end: event.end,
          participants: '',
          description: '',
        }
      : {
          title: event.event?._def.title,
          calendar: '',
          color: 'red',
          start: event.event._instance.range.start,
          end: event.event._instance.range.end,
          Participation: event.event._def.extendedProps.Participation,
          description: event.event._def.extendedProps.description,
        }

  const [formData, setFormData] = useState(initState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (type === 'add') {
      console.log('Add submit')
      dispatch(createEvent(formData))
    } else {
      console.log('Edit date change')
      const newEvent = {
        id: parseInt(event.event.id),
        allDay: true,
        ...formData,
      }
      console.log(newEvent)
      dispatch(editEvent(newEvent))
    }
    handleClose()
  }

  return (
    <div className="create-event__container">
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
        <form onSubmit={handleSubmit}>
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
              <Button type="button" onClick={handleClose} size="default" variant="outlined" label="Cancel"></Button>
            ) : (
              <Button
                type="button"
                onClick={handleClose}
                size="default"
                variant="outlined"
                label="Cancel Event"></Button>
            )}
            {label === 'Create New' ? (
              <Button type="submit" size="large" variant="primary" label="Create Event"></Button>
            ) : (
              <Button type="submit" size="large" variant="primary" label="Save"></Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
