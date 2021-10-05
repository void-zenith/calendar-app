import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../Icons/Close";
import Button from "./Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  cancelEvent,
  editEvent,
  postEvent,
  unselect,
} from "../Features/Calendar/EventSlice";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const CreateEvent = ({
  label,
  start_date,
  end_date,
  close,
  position: [posX, posY],
}) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.event.selectedEvent);
  const [selectedStartDate, setSelectedStartDate] = useState(start_date);
  const [selectedEndDate, setSelectedEndDate] = useState(end_date);
  const [eventTitle, setEventtitle] = useState("");
  //for description
  const [description, setDescription] = useState("");
  const hanldeDescription = (e) => {
    setDescription(e.target.value);
  };
  //for participants
  const [participants, setParticipants] = useState("");
  const [objPart, setObjPart] = useState({});

  //for event bg color
  const [color, setColor] = useState("#9EEC61");

  const hanldeParticipants = (e) => {
    setParticipants(e.target.value);
    setObjPart({ email: participants });
  };
  const hanldeChangeEventTitle = (e) => {
    setEventtitle((e.target.name = e.target.value));
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(unselect());
    close();
  };
  if (posX + 500 > window.innerWidth) {
    posX = posX - 720;
  }

  if (posY + 350 > window.innerHeight) {
    posY = posY - 300;
  }

  const handeCreateEvent = (e) => {
    const start = new Date(selectedStartDate).toISOString();
    const end = new Date(selectedEndDate).toISOString();
    let finalEventData = {
      title: eventTitle,
      start: start,
      end: end,
      description: description,
      participants: [{ email: participants }],
      color: "red",
      calendar: 2, //this is id of calendar
    };
    e.preventDefault();
    dispatch(postEvent(finalEventData));
    dispatch(unselect());
    close();
  };
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    dispatch(editEvent(selectedEvent));
    dispatch(unselect());
    close();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(cancelEvent(selectedEvent.id));
    dispatch(unselect());
    close();
  };
  const colors = ["#9EEC61", "#E83A3A", "#37DCDC", "#376FDC", "#FF8E09"];
  useEffect(() => {
    if (selectedEvent !== null) {
      setSelectedEndDate(selectedEvent.end);
      setSelectedStartDate(selectedEvent.start);
      setEventtitle(selectedEvent.title);
      setDescription(selectedEvent.extendedProps.description);
      for (
        let i = 0;
        i < selectedEvent.extendedProps.participants.length;
        i++
      ) {
        setParticipants(selectedEvent.extendedProps.participants[i].email);
      }
    }
  }, []);
  return (
    <div
      style={{ top: posY + "px", left: posX + "px" }}
      className="create-event__container"
    >
      <div className="create-event__header">
        <h1>{label} Event</h1>
        <div className="create-event__colorchoose">
          {colors.map((col, id) => (
            <div key={id}>
              <input type="radio" name="color" id={col} value={col}></input>
              <label htmlFor={col} onClick={() => setColor(col)}>
                <span style={{ background: col }} className={col}></span>
              </label>
            </div>
          ))}
        </div>
        <select className="choose-calendar">
          <option value="calendar">Calendar</option>
          <option value="calendar">User</option>
        </select>
        <Close onClick={handleClose}></Close>
      </div>
      <div className="create-event__body">
        <form>
          <input
            className="input-field input-eventTitle"
            placeholder="Event Title"
            name="eventTitle"
            type="text"
            value={eventTitle}
            onChange={hanldeChangeEventTitle}
          ></input>
          <div className="datepicker-container">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="date-picker date-picker__start"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="Date-picker"
                value={selectedStartDate}
                onChange={setSelectedStartDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              ></KeyboardDatePicker>
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="date-picker date-picker__start"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="Date-picker"
                value={selectedEndDate}
                onChange={setSelectedEndDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              ></KeyboardDatePicker>
            </MuiPickersUtilsProvider>
          </div>
          <input
            className="input-field input-participants"
            placeholder="participatns"
            name="participants"
            type="text"
            value={participants}
            onChange={hanldeParticipants}
          ></input>
          <textarea
            className="input-field__description"
            name="eventDescription"
            placeholder="Event Description"
            value={description}
            onChange={hanldeDescription}
            type="text"
          ></textarea>
          <div className="button-form__container">
            {label === "Create New" ? (
              <Button
                onClick={handleClose}
                size="default"
                variant="outlined"
                label="Cancel"
              ></Button>
            ) : (
              <Button
                onClick={handleCancel}
                size="default"
                variant="outlined"
                label="Cancel Event"
              ></Button>
            )}
            {label === "Create New" ? (
              <Button
                onClick={handeCreateEvent}
                size="large"
                variant="primary"
                label="Create Event"
              ></Button>
            ) : (
              <Button
                onClick={handleUpdateEvent}
                size="large"
                variant="primary"
                label="Save"
              ></Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
