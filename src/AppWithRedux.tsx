import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC, addTodolistTC, fetchTodolistsTC, TodolistDomainType
} from "./state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {useAppDispatch} from "./state/hooks";

// export type TasksType = {
//     [key: string]: Array<TaskType>
// }

function AppWithRedux() {
    //Общий диспатч редакса
    const dispatch = useAppDispatch()

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    useEffect(()=> {
        dispatch(fetchTodolistsTC())
    }, [dispatch])


    //Task remover ========================================================================
    // const removeTask = useCallback((id: string, todoListID: string) => {
    //     dispatch(removeTaskAC(todoListID, id))
    // }, [])
    //Task adder ========================================================================
    // const taskAdder = useCallback((inputValue: string, todoListID: string) => {
    //     dispatch(addTaskAC(todoListID,inputValue))
    // }, [])

    //Task status changer ====================================================================
    // const taskStatusChanger = useCallback((taskId: string, isDone: boolean, todoListID: string) => {
    //     dispatch(taskStatusChangerAC(todoListID, taskId, isDone))
    // }, [])
    //Task title changer ====================================================================
    // const taskTitleChanger = useCallback((taskId: string, newTitle: string, todoListID: string) => {
    //     dispatch(taskTitleChangerAC(todoListID, taskId, newTitle))
    // }, [])



    //Todolist title changer ====================================================================
    // const todolistTitleChanger = useCallback((newTitle: string, todoListID: string) => {
    //     dispatch(changeTodolistTitleAC(todoListID, newTitle))
    // }, [dispatch])
    //For filter button ====================================================================
    // const changeFilterValue = useCallback((id: string, filterValue: FilterValueType) => {
    //     dispatch(changeTodolistFilterAC(id, filterValue))
    // }, [dispatch])
    //
    // const removeTodolist = useCallback((todolistId: string) => {
    //     dispatch(removeTodolistAC(todolistId))
    // }, [dispatch])
    //FOR NEW TODOLIST==============================================================
    const todolistAdder = useCallback((todolistInputValue: string) => {
        // const action = addTodolistAC(todolistInputValue)
        dispatch(addTodolistTC(todolistInputValue))
    }, [dispatch])

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