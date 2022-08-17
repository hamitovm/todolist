import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, taskStatusChangerAC, taskTitleChangerAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type  FilterValueType = 'All' | 'Active' | 'Completed'


export type TodolistsType = {
    id: string
    title: string
    filterValue: FilterValueType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //Общий диспатч редакса
    const dispatch = useDispatch()

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)



    //Task remover ========================================================================
    const removeTask = (id: string, todoListID: string) => {
        dispatch(removeTaskAC(todoListID, id))
    }
    //Task adder ========================================================================
    const taskAdder = (inputValue: string, todoListID: string) => {
        dispatch(addTaskAC(todoListID,inputValue))
    }

    //Task status changer ====================================================================
    const taskStatusChanger = (taskId: string, isDone: boolean, todoListID: string) => {
        dispatch(taskStatusChangerAC(todoListID, taskId, isDone))
    }
    //Task title changer ====================================================================
    const taskTitleChanger = (taskId: string, newTitle: string, todoListID: string) => {
        dispatch(taskTitleChangerAC(todoListID, taskId, newTitle))
    }



    //Todolist title changer ====================================================================
    const todolistTitleChanger = (newTitle: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    }
    //For filter button ====================================================================
    const changeFilterValue = (id: string, filterValue: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id, filterValue))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    //FOR NEW TODOLIST==============================================================
    const todolistAdder = (todolistInputValue: string) => {
        const action = addTodolistAC(todolistInputValue)
        dispatch(action)
    }

    return (
        <div>
            <div className="App">

                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            Todolist
                        </Typography>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container  style={ {padding: '20px'}}>
                        <div className="todolist_page_header">
                            <h1>Add new TodoList</h1>
                            <AddItemForm itemAdder={todolistAdder}/>
                        </div>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(el => {
                            let filteredTask1 = tasks[el.id]
                            if (el.filterValue === 'Active') {
                                filteredTask1 = filteredTask1.filter((el: TaskType) => !el.isDone)
                            }
                            if (el.filterValue === 'Completed') {
                                filteredTask1 = filteredTask1.filter((el: TaskType) => el.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={ {padding: '10px'}}>
                                        <TodoList
                                            key={el.id}
                                            todolistId={el.id}
                                            title={el.title}
                                            // tasks={filteredTask1}
                                            // taskRemover={removeTask}
                                            filterValue={el.filterValue}
                                            setFilterValue={changeFilterValue}
                                            // taskAdder={taskAdder}
                                            // taskStatusChanger={taskStatusChanger}
                                            // taskTitleChanger={taskTitleChanger}
                                            todolistTitleChanger={todolistTitleChanger}
                                            removeTodolist={removeTodolist}
                                        />
                                    </Paper>

                                </Grid>

                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </div>
    )
}


export default AppWithRedux;