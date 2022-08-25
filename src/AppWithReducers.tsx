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

export type  FilterValueType = 'All' | 'Active' | 'Completed'

let todoListID1 = v1()
let todoListID2 = v1()

export type TodolistsType = {
    id: string
    title: string
    filterValue: FilterValueType
}
export type TasksObjType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todoListID1, title: 'What to learn', filterValue: 'All'},
        {id: todoListID2, title: 'What to buy', filterValue: 'All'},
    ])


    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todoListID1]: [
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false}],
            [todoListID2]: [
                {id: v1(), title: 'Python', isDone: true},
                {id: v1(), title: 'Django', isDone: true},
                {id: v1(), title: 'PPL', isDone: false}]
        }
    )
    //Task remover ========================================================================
    const removeTask = (id: string, todoListID: string) => {
        dispatchToTasksReducer(removeTaskAC(todoListID, id))
    }
    //Task adder ========================================================================
    const taskAdder = (inputValue: string, todoListID: string) => {
        dispatchToTasksReducer(addTaskAC(todoListID,inputValue))
    }

    //Task status changer ====================================================================
    const taskStatusChanger = (taskId: string, isDone: boolean, todoListID: string) => {
        dispatchToTasksReducer(taskStatusChangerAC(todoListID, taskId, isDone))
    }
    //Task title changer ====================================================================
    const taskTitleChanger = (taskId: string, newTitle: string, todoListID: string) => {
        dispatchToTasksReducer(taskTitleChangerAC(todoListID, taskId, newTitle))
    }



    //Todolist title changer ====================================================================
    const todolistTitleChanger = (newTitle: string, todoListID: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todoListID, newTitle))
    }
    //For filter button ====================================================================
    const changeFilterValue = (id: string, filterValue: FilterValueType) => {
        dispatchToTodolistsReducer(changeTodolistFilterAC(id, filterValue))
    }

    const removeTodolist = (todolistId: string) => {
        dispatchToTasksReducer(removeTodolistAC(todolistId))
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    }
    //FOR NEW TODOLIST==============================================================
    const todolistAdder = (todolistInputValue: string) => {
        const action = addTodolistAC(todolistInputValue)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
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
                            let filteredTask1 = tasksObj[el.id]
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
                                            // setFilterValue={changeFilterValue}
                                            // taskAdder={taskAdder}
                                            // taskStatusChanger={taskStatusChanger}
                                            // taskTitleChanger={taskTitleChanger}
                                            // todolistTitleChanger={todolistTitleChanger}
                                            // removeTodolist={removeTodolist}
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


export default AppWithReducers;