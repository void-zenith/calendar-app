import React from "react";
import { useDispatch } from "react-redux";
import { goToDisplayAll } from "../Features/Calendar/LayoutSlice";
import Button from "./Button";

const AddCalendar = () => {
  const dispatch = useDispatch();

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(goToDisplayAll());
  };
  const handleSave = (e) => {
    e.preventDefault();
  }
  return (
    <div className="addcalender-container">
      <h1>Create a new calendar</h1>
      <form className="addcalendar-form">
        <input
          className="input-field input-field__calendarName"
          type="text"
          placeholder="Calendar Name"
          name="CalendarName"
        ></input>
        <textarea
          className="input-field input-field__description"
          type="text"
          placeholder="Description"
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
      <button onClick={handleCancel}>Go back</button>
    </div>
  );
};

export default AddCalendar;
