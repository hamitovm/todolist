import {Container, Grid, Paper} from "@mui/material";
import {TodoList} from "../../TodoList";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTodolistTC, TodolistDomainType} from "../../state/todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../state/hooks";


type PropsType = {
    demo?: boolean
}

export const TodoLists = ({demo = false}: PropsType) => {

    //Общий диспатч редакса
    const dispatch = useAppDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    //FOR NEW TODOLIST==============================================================
    const todolistAdder = useCallback((todolistInputValue: string) => {
        // const action = addTodolistAC(todolistInputValue)
        dispatch(addTodolistTC(todolistInputValue))
    }, [dispatch])

    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
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
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={el.id}
                                    todolist={el}
                                    // todolistId={el.id}
                                    // title={el.title}
                                    // tasks={filteredTask1}
                                    // taskRemover={removeTask}
                                    // filterValue={el.filterValue}
                                    // setFilterValue={changeFilterValue}
                                    // taskAdder={taskAdder}
                                    // taskStatusChanger={taskStatusChanger}
                                    // taskTitleChanger={taskTitleChanger}
                                    // todolistTitleChanger={todolistTitleChanger}
                                    // removeTodolist={removeTodolist}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>

                    )
                })}
            </Grid>
        </Container>
    )
}