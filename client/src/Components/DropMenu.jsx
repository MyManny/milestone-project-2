import React, { useEffect, useState, useRef } from "react";


import './DropMenu.css'

function Dropdown() {
  const [state, setstate] =useState(false);
  const showDropdown=()=>{
    setstate(true);
  }
  const hideDropdown=()=>{
    setstate(false);
  }

  return (
    <div className="dropdown">
        <div className="dropdown-menu" onMouseEnter= {showDropdown} onMouseLeave={hideDropdown}>
        My todo list

        {state ?(<ul className="dropdown-list" onMouseEnter={showDropdown}>
        <li>1st value</li>
        <li>2nd value</li>
        <li>3rd value</li>
        <li>4th value</li>
        </ul>):
        null}

        </div>
    </div>
  )
}

export default Dropdown;