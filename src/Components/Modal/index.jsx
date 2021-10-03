import React from 'react'
// import './styles.scss'

import DescribeEvent from '../DescribeEvent'
import CreateEvent from '../CreateEvent'

const Modal = ({ handleClose, event, type, addEvent, properties }) => {
  const handleEdit = () => {
    console.log('Handle close/edit')
  }

  let posX, posY
  if (type === 'view') {
    posX = properties.clientX
    posY = properties.clientY
  } else {
    posX = (event.box && event.box.clientX) || event.bounds.x
    posY = (event.box && event.box.clientY) || event.bounds.y
  }

  return (
    <div
      className="modal-contain"
      onClick={(e) => (e.target.attributes[0].value === 'modal-contain' ? handleClose() : console.log('Not modal'))}>
      <div
        className="modal"
        onClick={(e) => console.log(e)}
        style={{
          position: 'absolute',
          top: `${posY > 350 ? posY - 300 : posY}px`,
          left: `${posX > 780 ? posX - 550 : posX}px`,
        }}>
        {type === 'view' ? (
          <DescribeEvent event={event} />
        ) : type === 'add' ? (
          <CreateEvent event={event} addEvent={addEvent} handleClose={handleClose} />
        ) : (
          <CreateEvent event={event} addEvent={addEvent} handleClose={handleClose} handleEdit={handleEdit} />
        )}
      </div>
    </div>
  )
}

export default Modal
