import React from 'react'

const Button = ({ label, onClick, size = 'default', variant = 'primary', rest }) => {
  return (
    <button className={`btn ${size} ${variant}`} onClick={onClick} {...rest}>
      {label}
    </button>
  )
}

export default Button
