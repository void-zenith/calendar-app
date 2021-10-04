import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Close from "../Icons/Close";
import Edit from "../Icons/Edit";
import { goToDisplayAll } from "../Features/Calendar/LayoutSlice";
import { unselect } from "../Features/Calendar/EventSlice";


const DescribeEvent = ({ openEdit, close, position: [posX, posY] }) => {
  const selectedEvent = useSelector((state) => state.event.selectedEvent);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(goToDisplayAll());
    dispatch(unselect());
    close();
  };
  const hanldeEdit = () => {
    openEdit();
  };

  if (posX + 500 > window.innerWidth) {
    posX = posX - 720;
  }

  if (posY + 350 > window.innerHeight) {
    posY = posY - 300;
  }
  return (
    <div
      style={{ top: posY + "px", left: posX + "px" }}
      className="describe-event__container"
    >
      <div className="describe-event__header">
        <div className="describe-event__heading">
          <h1 className="event-duration">Event</h1>
          <h6 className="event-calendar">myCalendar</h6>
        </div>
        <div className="describe-event__button">
          <Edit onClick={hanldeEdit}></Edit>
          <Close onClick={handleClose}></Close>
        </div>
      </div>
      <div style={{background:selectedEvent.backgroundColor}}className="color-container"></div>
      <div className="describe-event__body">
        <div className="from-to__container">
          <h2>
            From: <span className="date">{selectedEvent.start}</span>
          </h2>
          <h2>
            TO: <span className="date">{selectedEvent.end}</span>
          </h2>
        </div>
        <div className="participation__container">
          <h2>Participation</h2>
          <div className="partFlex">
            {selectedEvent &&
              selectedEvent.extendedProps.participants.map((ev, id) => (
                <p className="paraFlex" key={id}>
                  {ev.part}
                </p>
              ))}
          </div>
        </div>
        <div className="description__container">
          <h2>Description</h2>
          <p>{selectedEvent.extendedProps.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DescribeEvent;
