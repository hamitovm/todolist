import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksType, TodolistsType} from "./AppWithRedux";
import {addTaskAC, removeTaskAC, taskStatusChangerAC, taskTitleChangerAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    todolistId: string
    title: string,
    // tasks: Array<TaskType>
    // taskRemover: (id: string, todoListID: string) => void
    // taskAdder: (inputValue: string, todoListID: string) => void
    filterValue: FilterValueType
    setFilterValue: (id: string, filterValue: FilterValueType) => void
    // taskStatusChanger: (taskId: string, isDone: boolean, todoListID: string) => void
    // taskTitleChanger: (taskId: string, newTitle: string, todoListID: string) => void
    todolistTitleChanger: (newTitle: string, todoListID: string) => void
    removeTodolist: (todolistId: string) => void
}


export function TodoList(props: PropsType) {
    //Общий диспатч редакса
    const dispatch = useDispatch()

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
    if (props.filterValue === 'Completed') {
        tasks = tasks.filter(el => el.isDone)
    }
    if (props.filterValue === 'Active') {
        tasks = tasks.filter(el => !el.isDone)
    }


    //Task adder ========================================================================
    const taskAdder = (inputValue: string) => {
        dispatch(addTaskAC(props.todolistId, inputValue))
    }

    const onAllClickButtonHandler = () => {
        props.setFilterValue(props.todolistId, 'All')
    }
    const onActiveClickButtonHandler = () => {
        props.setFilterValue(props.todolistId, 'Active')
    }
    const onCompletedClickButtonHandler = () => {
        props.setFilterValue(props.todolistId, 'Completed')
    }
    const onTodolistDeleteClickHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    // const taskAdder = (inpitValue: string) => {
    //     props.taskAdder(inpitValue, props.todolistId)
    // }
    const onTodolistTitleChangeHandler = (newTitle: string) => {
        props.todolistTitleChanger(newTitle, props.todolistId)
    }


    return (
        <div>
            <div className="todolist_header">
                <h2>
                    <IconButton aria-label="delete"
                                onClick={onTodolistDeleteClickHandler}
                                size={'small'}>
                        <Delete fontSize="small"/>
                    </IconButton>
                    <EditableSpan title={props.title} onChange={onTodolistTitleChangeHandler}/>
                </h2>
            </div>
            <AddItemForm itemAdder={taskAdder}/>
            <ul>
                {tasks.map((el) => {
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(taskStatusChangerAC(props.todolistId, el.id, e.currentTarget.checked))
                    }
                    const onTaskTitleChangeHandler = (newTitle: string) => {
                        dispatch(taskTitleChangerAC(props.todolistId, el.id, newTitle))
                    }
                    return (
                        <div key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <IconButton aria-label="delete"
                                        onClick={() => dispatch(removeTaskAC(props.todolistId, el.id))}
                                        size="small">
                                <Delete fontSize="small"/>
                            </IconButton>
                            <input
                                type="checkbox"
                                defaultChecked={el.isDone}
                                onChange={onChangeCheckboxHandler}
                            />
                            <EditableSpan title={el.title} onChange={onTaskTitleChangeHandler}/>
                        </div>

                    )
                })}
            </ul>
            <div>
                <Button variant={props.filterValue === 'All' ? 'contained' : 'outlined'}
                    // className={props.filterValue === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickButtonHandler}>All
                </Button>
                <Button color={'primary'}
                        variant={props.filterValue === 'Active' ? 'contained' : 'outlined'}
                    // className={props.filterValue === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickButtonHandler}>Active
                </Button>
                <Button color={'secondary'}
                        variant={props.filterValue === 'Completed' ? 'contained' : 'outlined'}
                    // className={props.filterValue === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickButtonHandler}>Completed
                </Button>
            </div>
        </div>
    )
}



