import React, { useEffect, useState, useRef } from "react";

export default function DropMenu({ addToDo }) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const menuRef = useRef();

  const showDropDown = (dropDown) => {
    if (!dropDown.text || /^\s*$/.test(dropDown.text)) {
      return;
    }
    const newDropDown = [dropDown, ...list];
    setList(newDropDown);
  };

  function addDropDown() {
    return (
      <div> 
          <DropMenu onSubmit={addToDo}/>
      </div>
    )
    }

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="DropMenu">
      <div className="menu-container" ref={menuRef}>
        <div className="menu-trigger" onClick={() => setOpen(!open)}>
          {/* You can place the trigger content here */}
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
        <ul>
    <li>Dropdownitem text ={"Item 1"}</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
          <ul>
      {list.map((item, index) => (
    <DropdownItem key={index} text={item.text} />
       ))}
    </ul>
        </div>
      </div>
    </div>
  );



  function DropdownItem(props) {
    return (
      <li className='dropdownItem'>
        <a>{props.text}</a>
      </li>
    );
  }}