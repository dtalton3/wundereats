import React, { useState } from "react";
import "./Dropdown.css"

/**
 * Function that manages the dropdown selection fields in the hatchery creatino/editing process
 * 
 * @param {*} selected - the specific text entry a user will set based on their dropdown selection
 * @param {*} setSelected - the function that takes in the user input and sets 'selected' to that String value
 * @param {*} options - list of Strings that represent the choices users can choose from in the dropdown
 * @returns 
 */
function Dropdown({ selected, setSelected, options }) {

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
