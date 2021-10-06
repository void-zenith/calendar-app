import React, { useState } from "react"
import { useDispatch } from "react-redux"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers"

import Close from "../Icons/Close"
import Button from "./Button"
import Colorpicker from "./Colorpicker"
import { createEvent, deleteEvent, editEvent } from "../Features/Calendar/EventSlice"

const CreateEvent = ({ event, handleClose, label, type, calendar }) => {
  const dispatch = useDispatch()
  console.log(event.event)
  let initState =
    type === "add"
      ? {
          title: "",
          calendar: calendar,
          color: "blue",
          start: event.start,
          end: event.end,
          participants: "",
          description: "",
        }
      : {
          title: event.event._def.title,
          calendar: calendar,
          color: event.event._def.extendedProps.color,
          start: event.event._instance.range.start,
          end: event.event._instance.range.end,
          participants: event.event._def.extendedProps.participants,
          description: event.event._def.extendedProps.description,
        }

  const [formData, setFormData] = useState(initState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteEvent(parseInt(event.event.id)))
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (type === "add") {
      console.log("Add submit")
      const submit = { ...formData }
      !formData.participants && delete submit.participants
      dispatch(createEvent(submit))
    } else {
      console.log("Edit date change")
      const newEvent = {
        ...formData,
        id: parseInt(event.event.id),
        allDay: true,
      }
      !formData.participants && delete newEvent.participants
      console.log(newEvent)
      dispatch(editEvent(newEvent))
    }
    handleClose()
  }

  return (
    <div className='create-event__container'>
      <div className='create-event__header'>
        <h1>{label} Event</h1>

        <Colorpicker color={formData.color} setColor={(e) => setFormData({ ...formData, color: e.target.value })} />
        <select className='choose-calendar'>
          <option value='calendar'>Calendar</option>
          <option value='calendar'>User</option>
        </select>
        <Close onClick={handleClose} />
      </div>

      <div className='create-event__body'>
        <form onSubmit={handleSubmit}>
          <input
            className='input-field input-eventTitle'
            placeholder='Event Title'
            name='title'
            type='text'
            value={formData.title}
            onChange={handleChange}
          />

          <div className='datepicker-container'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className='date-picker date-picker__start'
                disableToolbar
                variant='inline'
                format='dd/MM/yyyy hh:mm'
                margin='normal'
                id='Date-picker'
                name='start'
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, start: e })}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}></DateTimePicker>
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className='date-picker date-picker__start'
                disableToolbar
                variant='inline'
                format='dd/MM/yyyy hh:mm'
                margin='normal'
                id='Date-picker'
                name='end'
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e })}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}></DateTimePicker>
            </MuiPickersUtilsProvider>
          </div>

          <input
            className='input-field input-participants'
            placeholder='Participants'
            name='participants'
            type='text'
            value={formData.participants}
            onChange={handleChange}
          />

          <textarea
            className='input-field__description'
            name='description'
            placeholder='Event Description'
            value={formData.description}
            onChange={handleChange}
            type='text'
          />

          <div className='button-form__container'>
            {label === "Create" ? (
              <Button type='button' onClick={handleClose} size='default' variant='outlined' label='Cancel'></Button>
            ) : (
              <Button
                type='button'
                onClick={handleDelete}
                size='default'
                variant='outlined'
                label='Cancel Event'></Button>
            )}
            {label === "Create" ? (
              <Button type='submit' size='large' variant='primary' label='Create Event'></Button>
            ) : (
              <Button type='submit' size='large' variant='primary' label='Save'></Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
