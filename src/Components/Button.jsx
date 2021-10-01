import React from "react";

const Button = ({ label, onClick, size = "default", variant = "primary" }) => {
  return (
    <button className={`btn ${size} ${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
