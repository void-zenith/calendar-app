import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { goToDisplayAll } from "../Features/Calendar/LayoutSlice";
import { createCalendar } from "../Features/Calendar/EventSlice";
import Button from "./Button";

const AddCalendar = () => {
  const dispatch = useDispatch();
  const [calendarName, setCalendarName] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(goToDisplayAll());
  };
  const handleCalendarName = (e) => {
    setCalendarName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  let finalCal = {
    name: calendarName,
    description: description,
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(createCalendar(finalCal));
  };
  return (
    <div className="addcalender-container">
      <h1>Create a new calendar</h1>
      <form className="addcalendar-form">
        <input
          className="input-field input-field__calendarName"
          type="text"
          placeholder="Calendar Name"
          name="CalendarName"
          onChange={handleCalendarName}
        ></input>
        <textarea
          className="input-field input-field__description"
          type="text"
          placeholder="Description"
          onChange={handleDescription}
        ></textarea>
        <div className="button-form__container">
          <Button
            onClick={handleCancel}
            size="default"
            variant="outlined"
            label="Cancel"
          ></Button>
          <Button
            onClick={handleSave}
            size="large"
            variant="primary"
            label="Save"
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default AddCalendar;
