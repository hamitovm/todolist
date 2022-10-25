import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FilterValueType, TodolistDomainType} from "./state/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";


let todoListID1 = v1()
let todoListID2 = v1()

// export type TodolistsType = {
//     id: string
//     title: string
//     filterValue: FilterValueType
// }
export type TasksObjType = {
    [key: string]: Array<TaskType>
}

function App() {
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todoListID1, title: 'What to learn', filterValue: 'All', addedDate:'', order: 0},
        {id: todoListID2, title: 'What to buy', filterValue: 'All', addedDate:'', order: 0},
    ])


    let [tasksObj, setTasksObj] = useState<TasksObjType>(
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
        tasksObj[todoListID] = tasksObj[todoListID].filter((el: TaskType) => el.id !== id)
        setTasksObj({...tasksObj})
    }
    //Task adder ========================================================================
    const taskAdder = (inputValue: string, todoListID: string) => {
        let newTask: TaskType = {
            description: '',
            title: inputValue,
            status: TaskStatuses.New,
            priority: TaskPriorities.Later,
            startDate: '',
            deadline: '',
            id: v1(),
            todoListId: todoListID,
            order: 0,
            addedDate: '',
        }
        tasksObj[todoListID] = [newTask, ...tasksObj[todoListID]]
        setTasksObj({...tasksObj})
    }

    //Task status changer ====================================================================
    const taskStatusChanger = (taskId: string, status: TaskStatuses, todoListID: string) => {
        let task = tasksObj[todoListID].find(el => el.id === taskId)
        if (task) {
            task.status = status
        }
        setTasksObj({...tasksObj})
    }
    //Task title changer ====================================================================
    const taskTitleChanger = (taskId: string, newTitle: string, todoListID: string) => {
        let task = tasksObj[todoListID].find(el => el.id === taskId)
        if (task) {
            task.title = newTitle
        }
        setTasksObj({...tasksObj})
    }



    //Todolist title changer ====================================================================
    const todolistTitleChanger = (newTitle: string, todoListID: string) => {
        let todolist = todolists.find(el => el.id === todoListID)
        if (todolist) {
            todolist.title = newTitle
        }
        setTodolists([...todolists])
    }
    //For filter button ====================================================================
    const changeFilterValue = (id: string, filterValue: FilterValueType) => {
        let todolist = todolists.find(el => el.id === id)
        if (todolist) {
            todolist.filterValue = filterValue
        }
        let copyTodolist = [...todolists]
        setTodolists(copyTodolist)
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    //FOR NEW TODOLIST==============================================================
    const todolistAdder = (todolistInputValue: string,) => {
        let newTodolistId = v1()
        let newTodolist: TodolistDomainType = {id: todoListID1, title: todolistInputValue, filterValue: 'All', addedDate:'', order: 0}
        tasksObj[newTodolistId] = []
        setTasksObj({...tasksObj})
        setTodolists([newTodolist, ...todolists])
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


export default App;