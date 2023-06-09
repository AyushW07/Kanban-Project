import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import AddList from "./Components/organism/AddList/AddList";
import NavBar from "./Components/organism/NavBar/NavBar";
import Description from "./Components/organism/Description/Description";
import { useRecoilState } from "recoil";
import { list } from "./recoil/desc-atoms";

function App() {
  const [listData, setListData] = useRecoilState(list);

  useEffect(() => {
    if (listData.length != 0) {
      localStorage.setItem("listData", JSON.stringify(listData));
    }
  }, [listData]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kanban />} />
        <Route path="/task/:id" element={<Description />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Kanban() {
  const [columns, setColumns] = useRecoilState(list);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (columns.length != 0) {
      localStorage.setItem("listData", JSON.stringify(columns));
    }
  }, [columns]);

  return (
    <div className="App">
      <NavBar />
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, columns, setColumns, setCount, count)
        }
      >
        <div className="content">
          <AddList />
        </div>
      </DragDropContext>
    </div>
  );
}

const onDragEnd = (result, columns, setColumns, setCount, count) => {
  if (!result.destination) {
    return;
  }
  const { source, destination } = result;

  // * moving list
  if (result.type == "COLUMN") {
    const copiedItems = JSON.parse(JSON.stringify(columns));
    const [removed] = copiedItems.splice(source.index, 1);
    const rem = JSON.parse(JSON.stringify(removed));
    copiedItems.splice(destination.index, 0, rem);
    setColumns([...copiedItems]);
    setCount(count + 1);
    return;
  }

  // * moving task to same list
  if (source.droppableId === destination.droppableId) {
    let dragedTaskList = columns.find(
      (list) => list.ListId == source.droppableId
    );
    if (dragedTaskList != undefined) {
      let taskList = JSON.parse(JSON.stringify(dragedTaskList.tasks));
      const [removedTask] = taskList.splice(source.index, 1);
      taskList.splice(destination.index, 0, removedTask);

      let updatedList = {
        ...dragedTaskList,
        tasks: [...taskList],
      };

      const updatedLists = columns.map((list) => {
        if (list.ListId == source.droppableId) {
          return updatedList;
        }
        return list;
      });
      setColumns(updatedLists);
      setCount(count + 1);
      return;
    }
  }

  // * moving task to different list

  let sourceTaskList = columns.find(
    (list) => list.ListId == source.droppableId
  );
  let sourceListName = sourceTaskList.nameOfList;
  let destinationTaskList = columns.find(
    (list) => list.ListId == destination.droppableId
  );
  let destinationListName = destinationTaskList.nameOfList;
  const current = JSON.parse(JSON.stringify(sourceTaskList.tasks));
  const next = JSON.parse(JSON.stringify(destinationTaskList.tasks));
  const target = current[source.index];
  const currentTime = new Date().toLocaleString();
  let newActivity = {
    text: `Moved from ${sourceListName} to ${destinationListName}`,
    time: currentTime,
  };

  target.activity = [newActivity, ...target.activity];
  // * removing from original list
  current.splice(source.index, 1);

  // * inserting into next
  next.splice(destination.index, 0, target);

  // * merging the updated task in list
  const updatedLists = columns.map((list) => {
    if (list.ListId == source.droppableId) {
      return {
        ...list,
        tasks: current,
      };
    }
    if (list.ListId == destination.droppableId) {
      return {
        ...list,
        tasks: next,
      };
    }
    return list;
  });

  // ? adding the updatedList
  setColumns([...updatedLists]);
  setCount(count + 1);
};
