
import React, {useState} from 'react'
import './App.css'
import Board from './components/Board/Board';
import { FiMoreHorizontal } from "react-icons/fi";
import Editable from './components/Editable/Editable';

function App() {


  const [boards, setBoards]= useState([
    {
    id:Date.now () + Math.random()*2,
    title:"To Do",
    
    cards:[
      {
        id:Date.now()+Math.random(),
        title:"Card 1",
        task:[],
        labels:[{
        text:"frontends",
        color:"blue",
        },
      ],
        desc:"dhjchddsbcjbc",
        date:""

      }
    ]
  },
    
    {
    id:Date.now () + Math.random(),
    title:"To Do",
    cards:[
      {
        id:Date.now()+Math.random(),
        title:"Card 1",
        task:[],
        labels:[{
        text:"backend",
        color:"brown",
        },
      ],
        desc:"dhjchddsbcjbc",
        date:""

      }
    ]
  }
])
  
  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban  Board </h2>
      
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {
            boards.map((item)=><Board
            key={item.id}  board={item}/>)
          }
         
          <div className="app_boards_board"><Editable
          displayClass="app_boards_board_add"
          text="Add Board"
          placeholder="Enter board title"
          /></div>
          
          
          </div> 
          
    
      </div>

    </div>
  );
}

export default App;
