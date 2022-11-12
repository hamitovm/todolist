import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
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
import {addTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";

export type  FilterValueType = 'All' | 'Active' | 'Completed'

let todoListID1 = v1()
let todoListID2 = v1()

export type TasksObjType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todoListID1, title: 'What to learn', filterValue: 'All', addedDate:'', order: 0},
        {id: todoListID2, title: 'What to buy', filterValue: 'All', addedDate:'', order: 0},
    ])


    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todoListID1]: [
                {
                    description: '',
                    title: 'CSS',
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Hi,
                    startDate: '',
                    deadline: '',
                    id: v1(),
                    todoListId: todoListID1,
                    order: 0,
                    addedDate: '',
                },
                {
                    description: '',
                    title: 'React',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Middle,
                    startDate: '',
                    deadline: '',
                    id: v1(),
                    todoListId: todoListID1,
                    order: 0,
                    addedDate: '',
                }],
            [todoListID2]: [
                {
                    description: '',
                    title: 'Python',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    id: v1(),
                    todoListId: todoListID2,
                    order: 0,
                    addedDate: '',
                },
                {
                    description: '',
                    title: 'Go',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Later,
                    startDate: '',
                    deadline: '',
                    id: v1(),
                    todoListId: todoListID2,
                    order: 0,
                    addedDate: '',
                }]
        }
    )
    //Task remover ========================================================================
    const removeTask = (id: string, todoListID: string) => {
        dispatchToTasksReducer(removeTaskAC(todoListID, id))
    }
    //Task adder ========================================================================
    // const taskAdder = (inputValue: string, todoListID: string) => {
    //     dispatchToTasksReducer(addTaskAC(todoListID,inputValue))
    // }

    //Task status changer ====================================================================
    // const taskStatusChanger = (taskId: string, status: TaskStatuses, todoListID: string) => {
    //     dispatchToTasksReducer(taskStatusChangerAC(todoListID, taskId, status))
    // }
    //Task title changer ====================================================================
    // const taskTitleChanger = (taskId: string, newTitle: string, todoListID: string) => {
    //     dispatchToTasksReducer(taskTitleChangerAC(todoListID, taskId, newTitle))
    // }



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
    // const todolistAdder = (todolistInputValue: string) => {
    //     const action = addTodolistAC(todolistInputValue)
    //     dispatchToTasksReducer(action)
    //     dispatchToTodolistsReducer(action)
    // }

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
                            {/*<AddItemForm itemAdder={todolistAdder}/>*/}
                        </div>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(el => {
                            let filteredTask1 = tasksObj[el.id]
                            if (el.filterValue === 'Active') {
                                filteredTask1 = filteredTask1.filter((el: TaskType) => el.status === TaskStatuses.New)
                            }
                            if (el.filterValue === 'Completed') {
                                filteredTask1 = filteredTask1.filter((el: TaskType) => el.status === TaskStatuses.Completed)
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