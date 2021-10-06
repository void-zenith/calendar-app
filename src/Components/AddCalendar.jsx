import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "./Button"
import { createCalendar } from "../Features/Calendar/CalendarSlice"

const AddCalendar = ({ history }) => {
  const dispatch = useDispatch()
  const [formData, setFormdata] = useState({ name: "", description: "", events: [] })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(createCalendar(formData))
    history.push("/calendar")
  }
  return (
    <div className='addcalender-container'>
      <h1>Create a new calendar</h1>
      <form className='addcalendar-form'>
        <input
          className='input-field input-field__calendarName'
          type='text'
          placeholder='Calendar Name'
          name='name'
          value={formData.name}
          onChange={(e) => setFormdata({ ...formData, name: e.target.value })}
        />
        <textarea
          className='input-field input-field__description'
          type='text'
          placeholder='Description'
          name='description'
          value={formData.description}
          onChange={(e) => setFormdata({ ...formData, description: e.target.value })}
        />

        <div className='button-form__container'>
          <Button type='button' onClick={() => history.push("/")} size='default' variant='outlined' label='Cancel' />
          <Button type='sumbit' onClick={handleSubmit} size='large' variant='primary' label='Save'></Button>
        </div>
      </form>
    </div>
  )
}

export default AddCalendar
