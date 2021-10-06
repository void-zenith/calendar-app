import React from "react"

import DescribeEvent from "../DescribeEvent"
import CreateEvent from "../CreateEvent"

const Modal = ({ handleClose, event, type, openEdit, calendar }) => {
  let posX = event.jsEvent.x
  let posY = event.jsEvent.y
  return (
    <div
      className='modal-contain'
      onClick={(e) => (e.target?.attributes[0]?.value === "modal-contain" ? handleClose() : "")}>
      <div
        className='modal'
        style={{
          position: "absolute",
          top: `${posY > 270 ? posY - 340 : posY - 10}px`,
          left: `${posX > 780 ? posX - 550 : posX}px`,
        }}>
        {type === "view" ? (
          <DescribeEvent event={event} handleClose={handleClose} openEdit={openEdit} />
        ) : type === "add" ? (
          <CreateEvent event={event} handleClose={handleClose} type={type} calendar={calendar} />
        ) : (
          <CreateEvent event={event} handleClose={handleClose} type={type} calendar={calendar} />
        )}
      </div>
    </div>
  )
}

export default Modal
