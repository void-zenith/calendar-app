import React from 'react'
import './styles.scss'

// const colors = ['#9EEC61', '#E83A3A', '#37DCDC', '#376FDC', '#FF8E09']

const ColorPicker = ({ color, setColor }) => {
  return (
    <div className="colorbox">
      <input type="radio" name="color" id="green" value="green" checked={color === 'green'} onChange={setColor} />
      <label htmlFor="green">
        <span className="green"></span>
      </label>

      <input type="radio" name="color" id="red" value="red" checked={color === 'red'} onChange={setColor} />
      <label htmlFor="red">
        <span className="red"></span>
      </label>

      <input type="radio" name="color" id="teal" value="teal" checked={color === 'teal'} onChange={setColor} />
      <label htmlFor="teal">
        <span className="teal"></span>
      </label>

      <input type="radio" name="color" id="blue" value="blue" checked={color === 'blue'} onChange={setColor} />
      <label htmlFor="blue">
        <span className="blue"></span>
      </label>

      <input type="radio" name="color" id="orange" value="orange" checked={color === 'orange'} onChange={setColor} />
      <label htmlFor="orange">
        <span className="orange"></span>
      </label>
    </div>
  )
}

export default ColorPicker
