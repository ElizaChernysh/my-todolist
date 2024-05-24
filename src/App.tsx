import React, { useState } from 'react';
// eslint-disable-next-line
import { TaskType, Todolist } from './Todolist';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({...tasksObj});
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;

    setTasks({...tasksObj});
  }

  function changeTodolistTitle(id: string, newTitle: string){
    const todolist = todolists.find(tl => tl.id === id);

    if (todolist) {
      todolist.title = newTitle;
      setTodolists([... todolists]);
    }
  }

  function addTask(title: string, todolistId: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false
    }
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];

    let task = tasks.find(t => t.id === taskId);

    if (task) {
      task.isDone = isDone;

    setTasks({...tasksObj});
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];

    let task = tasks.find(t => t.id === taskId);

    if (task) {
      task.title = newTitle;

    setTasks({...tasksObj});
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);

    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState <Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: 
    [ { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false }],

    [todolistId2]: 
    [ { id: v1(), title: "Book", isDone: true },
    { id: v1(), title: "Rom", isDone: true }]
  });


  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    };

    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        todolists.map((tl) => {

          let tasksObjForTodolist = tasksObj[tl.id];

          if (tl.filter === "completed") {
            tasksObjForTodolist = tasksObjForTodolist.filter(t => t.isDone === true);
          }

          if (tl.filter === "active") {
            tasksObjForTodolist = tasksObjForTodolist.filter(t => t.isDone === false);
          }

          return <Todolist key={tl.id}
                           id={tl.id}
                           title={tl.title}
                           tasksObj={tasksObjForTodolist}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           changetasksObjtatus={changeStatus}
                           changeTaskTitle={changeTaskTitle}
                           filter={tl.filter}
                           removeTodolists={removeTodolist}
                           changeTodolistTitle={changeTodolistTitle}
          />
        })
      }



      {/* <Todolist title="Movies" tasksObj={tasksObj2}/>
     <Todolist title="Songs" tasksObj={tasksObj3}/> */}
    </div>
  );
}



export default App;
