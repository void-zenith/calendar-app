import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCalendar, calendarList, calendarLoading, selectCalendar } from "../Features/Calendar/CalendarSlice"

const Home = ({ history }) => {
  const [calendar, setSalendar] = useState("")
  const dispatch = useDispatch()
  useEffect(() => dispatch(getCalendar()), [dispatch])
  const calendars = useSelector(calendarList)
  const loading = useSelector(calendarLoading)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(selectCalendar(calendar))
    history.push("/calendar")
  }
  return (
    <div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create Calendar</Link>
        <Link to='/calendar'>View Calendar</Link>
      </div>
      <div>{loading && <h2>Loading ...</h2>}</div>
      <div>
        <select onChange={(e) => setSalendar(e.target.value)}>
          {!loading &&
            calendars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        <button type='submit' onClick={handleSubmit}>
          Pick calendar
        </button>
      </div>
    </div>
  )
}

export default Home
