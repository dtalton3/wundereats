import React from 'react';
import "./Switch.css";
import cx from "classnames";
 
const Switch = ({rounded = false, isToggled, onToggle}) => {
    const sliderCX = cx("slider",  {
        rounded: rounded
    })
    return (
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChanged={onToggle}/>
            <span className={sliderCX}/>
        </label>
    )
}
export default Switch;