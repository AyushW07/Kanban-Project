import React, {useState} from 'react'
import "./Board.css"
import Cards from '../Cards/Cards'
import { FiMoreHorizontal } from "react-icons/fi";
import Editable from '../Editable/Editable';
import DropDown from '../Dropdown/DropDown';


function Board(props) {
  const [showDropdown , setShowDropdown]= useState(false);



  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title}<span></span>
          {/* {'${props.board?.Cards?.lenght}'} */}
          </p>
        <div className="board_top_more" onClick={() => setShowDropdown(true)} >
          <FiMoreHorizontal/>
          {showDropdown && (
          <DropDown   > 
          <div className="board_dropdown">
          <p > Delete Board</p>
          </div>
        </DropDown>
        )}
          </div>

          
        
        
      </div>
      <div className="board_cards  custom-scroll ">
        {props.board?.Cards?.map((item) =(
          <Cards key={item.id}
          Cards={item.id}
          />
        ))}
        <Cards/>
        <Cards/>
        <Editable
        displayClass="board_card_add"
        text="Add Card"
        placeholder="Enter card Title"
        />
      </div>
    </div>
  )
}

export default Board
