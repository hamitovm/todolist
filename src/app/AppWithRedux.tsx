import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import { addTodolistTC, fetchTodolistsTC, TodolistDomainType
} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {useAppDispatch} from "../state/hooks";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {TaskType} from "../api/todolists-api";

export type TasksObjType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    //Общий диспатч редакса
    const dispatch = useAppDispatch()

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    useEffect(()=> {
        dispatch(fetchTodolistsTC())
    }, [dispatch])


    //FOR NEW TODOLIST==============================================================
    const todolistAdder = useCallback((todolistInputValue: string) => {
        // const action = addTodolistAC(todolistInputValue)
        dispatch(addTodolistTC(todolistInputValue))
    }, [dispatch])

    return (
        <div>
            <div className="App">
                <ErrorSnackbar/>
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
                    <LinearProgress />
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
                            // let filteredTask1 = tasks[el.id]
                            // if (el.filterValue === 'Active') {
                            //     filteredTask1 = filteredTask1.filter((el: TaskType) => !el.isDone)
                            // }
                            // if (el.filterValue === 'Completed') {
                            //     filteredTask1 = filteredTask1.filter((el: TaskType) => el.isDone)
                            // }
                            return (
                                <Grid item key={el.id}>
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


export default AppWithRedux;