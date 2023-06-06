import React, { useState } from "react";
import "./Editable.css";
import { FiX } from "react-icons/fi";

function Editable(props) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div className="editable">
      {showEdit ? (
        <form
          className="editable_edit"
          onSubmit={(event) => {
            event.preventDefault();
            if (props.onsubmit) props.onSubmit();
          }}
        >
          <input
          autoFocus
            type="text"
            defaultValue={props.text}
            placeholder={props.placeholder  || "Enter item"}
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttontext || "Add"}</button>
            <FiX onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p className={'editable_display'} onClick={() => setShowEdit(true)}> {props.text || "Add items"}</p>
      )}
    </div>
  );
}

export default Editable;
