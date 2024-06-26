import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type PropsType = {
  id: string
  title: string
  tasksObj: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void;
  changetasksObjtatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTodolists: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
}

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodolist = () => {
    props.removeTodolists(props.id);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <button onClick={removeTodolist}>*</button></h3>
        <AddItemForm addItem={addTask}/>
      <ul>
        {
          props.tasksObj.map(t => {

            const onRemoveHandler = () => { props.removeTask(t.id, props.id) };
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changetasksObjtatus(t.id, e.currentTarget.checked, props.id);
            };

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id);
            };

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                onChange={onChangeStatusHandler}
                checked={t.isDone}>
              </input>
              <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
              <button onClick={onRemoveHandler}>*</button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >All
        </button>
        <button className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >Active
        </button>
        <button className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >Completed
        </button>
      </div>
    </div>
  )
}

