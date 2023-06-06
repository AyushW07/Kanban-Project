import React, {useState} from 'react'
import "./Cards.css";
import Chips from "../Chip/Chips";
import { FiCheckSquare } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from '../Dropdown/DropDown';
function Cards(props) {

  const [showDropdown , setShowDropdown]= useState(false);
  return (
    <div className="card">
      <div className="card_top">
        <div className="card_top_labels">

          {props.card?labels?.map((item,index)=>(<Chips key={index}
            text={item.text}
            color={item.color}
            />)):''}
          <Chips text="Frontends" color="green" />
          <Chips FiX text="Urgent" color="red" />
        </div>
        <div className="card_top_more" onClick={() => setShowDropdown(true)}>
          <FiMoreHorizontal />
          {showDropdown && (
            <DropDown  >
              <div className="card_dropdown">
                <p> Delete Card</p>
              </div>
            </DropDown>




          )}
        </div>
      </div>
      <div className="card_title">{props.card?.title}</div>
      <div className="card_footer">
        {props.card?.date &&
        <p>
          <FiClock />
          {props.card?.date}
        </p>
}
        <p>
          <FiCheckSquare />
          1/4
         
        </p>
      </div>
    </div>
  );

}

export default Cards;
