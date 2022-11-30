import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {fetchTodolistsTC, TodolistDomainType} from "../state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {useAppDispatch} from "../state/hooks";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {TaskType} from "../api/todolists-api";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Routes, Route, Navigate} from "react-router-dom";
import {TodoLists} from "../features/TodoLists/TodoLists";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

export type TasksObjType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {

    //Общий диспатч редакса
    const dispatch = useAppDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    useEffect(()=> {
        dispatch(initializeAppTC())
    }, [])
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const onLogoutClickHandler = useCallback(()=> {
        dispatch(logoutTC())
    }, [isLoggedIn])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', width: '100%', textAlign: 'center'}}>
            <CircularProgress/>
        </div>
    }




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
                            {isLoggedIn && <Button color={'inherit'} onClick={onLogoutClickHandler}>Logout</Button>}
                            {/*<Button color={'inherit'}>Login</Button>*/}
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