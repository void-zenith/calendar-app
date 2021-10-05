import React from 'react'
import './styles.scss'

// const colors = ['#9EEC61', '#E83A3A', '#37DCDC', '#376FDC', '#FF8E09']

const ColorPicker = () => {
  return (
    <div className="colorbox">
      <input type="radio" name="color" id="green" />
      <label htmlFor="green">
        <span className="green"></span>
      </label>

      <input type="radio" name="color" id="red" value="red" />
      <label htmlFor="red">
        <span className="red"></span>
      </label>

      <input type="radio" name="color" id="teal" />
      <label htmlFor="teal">
        <span className="teal"></span>
      </label>

      <input type="radio" name="color" id="blue" />
      <label htmlFor="blue">
        <span className="blue"></span>
      </label>

      <input type="radio" name="color" id="orange" />
      <label htmlFor="orange">
        <span className="orange"></span>
      </label>
    </div>
  )
}

export default ColorPicker
