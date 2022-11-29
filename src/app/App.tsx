import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {fetchTodolistsTC, TodolistDomainType} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {useAppDispatch} from "../state/hooks";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {TaskType} from "../api/todolists-api";
import {RequestStatusType} from "./app-reducer";
import {Routes, Route} from "react-router-dom";
import {TodoLists} from "../features/TodoLists/TodoLists";
import {Login} from "../features/Login/Login";

export type TasksObjType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {

    //Общий диспатч редакса
    const dispatch = useAppDispatch()

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    useEffect(() => {
        //При demo === true диспатч не выполнится
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch])


    return (
            <div>
                <div className="App">
                    {/*{appStatus.error && <ErrorSnackbar/>}*/}
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
                        {requestStatus === "loading" && <LinearProgress/>}
                    </AppBar>
                    <Routes>
                        <Route path={"/"} element={<TodoLists demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>

                </div>
            </div>


    )
}


export default App;