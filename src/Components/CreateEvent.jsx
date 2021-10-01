import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../Icons/Close";
import ColorChoose from "../Icons/ColorChoose";
import Button from "./Button";
import DateFnsUtils from "@date-io/date-fns";
import { createEvent, editEvent, unselect } from "../Features/Calendar/EventSlice";
import { removeEvent } from "../Features/Calendar/EventSlice";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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
  const selectedEvent = useSelector((state) => state.event.selected);
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
  const [arrPart, setArrPart] = useState([]);

  //for event bg color
  const [color, setColor] = useState("#9EEC61");

  const hanldeParticipants = (e) => {
    setParticipants(e.target.value);
    setObjPart({ part: participants });
    setArrPart([objPart]);
  };
  const hanldeChangeEventTitle = (e) => {
    setEventtitle((e.target.name = e.target.value));
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(unselect());
    close();
  };
  useEffect(() => {
    if (selectedEvent !== null) {
    }
  }, []);
  if (posX + 500 > window.innerWidth) {
    posX = posX - 720;
  }

  if (posY + 350 > window.innerHeight) {
    posY = posY - 300;
  }
  let finalEventData = {
    title: eventTitle,
    start: selectedStartDate,
    end: selectedEndDate,
    description: description,
    Participation: arrPart,
    color: color,
  };
  const handeCreateEvent = (e) => {
    e.preventDefault();

    dispatch(createEvent(finalEventData));
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
    dispatch(removeEvent(selectedEvent));
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
        i < selectedEvent.extendedProps.Participation.length;
        i++
      ) {
        setParticipants(selectedEvent.extendedProps.Participation[i].part);
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
            <button className="btnColor" key={id} onClick={() => setColor(col)}>
              <ColorChoose color={col}></ColorChoose>
            </button>
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
