import React from 'react'
import './Chips.css'
import { FiX } from "react-icons/fi";

function Chips( props) {
  return (
    <div className="chip" style={{backgroundColor:props.color}}>
        {props.text}
        {props.close && <FiX/> }
      
    </div>
  )
}

export default Chips
