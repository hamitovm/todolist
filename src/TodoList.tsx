import React, { useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, removeTaskAC, taskStatusChangerAC, taskTitleChangerAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {TaskComponent} from "./Task";

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
    // setFilterValue: (id: string, filterValue: FilterValueType) => void
    // taskStatusChanger: (taskId: string, isDone: boolean, todoListID: string) => void
    // taskTitleChanger: (taskId: string, newTitle: string, todoListID: string) => void
    // todolistTitleChanger: (newTitle: string, todoListID: string) => void
    // removeTodolist: (todolistId: string) => void
}


export const TodoList = React.memo((props: PropsType) => {
    console.log('TodoList called')
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
    const taskAdder = useCallback((inputValue: string) => {
        dispatch(addTaskAC(props.todolistId, inputValue))
    }, [dispatch, props.todolistId])

    const onAllClickButtonHandler = useCallback(() => {
        // props.setFilterValue(props.todolistId, 'All')
        dispatch(changeTodolistFilterAC(props.todolistId, 'All'))
    }, [dispatch, props.todolistId])
    const onActiveClickButtonHandler = useCallback(() => {
        // props.setFilterValue(props.todolistId, 'Active')
        dispatch(changeTodolistFilterAC(props.todolistId, 'Active'))

    }, [dispatch, props.todolistId])
    const onCompletedClickButtonHandler = useCallback(() => {
        // props.setFilterValue(props.todolistId, 'Completed')
        dispatch(changeTodolistFilterAC(props.todolistId, 'Completed'))

    }, [dispatch, props.todolistId])
    const onTodolistDeleteClickHandler = useCallback(() => {
        // props.removeTodolist(props.todolistId)
        dispatch(removeTodolistAC(props.todolistId))

    }, [dispatch, props.todolistId])

    // const taskAdder = (inpitValue: string) => {
    //     props.taskAdder(inpitValue, props.todolistId)
    // }
    const onTodolistTitleChangeHandler = useCallback((newTitle: string) => {
        // props.todolistTitleChanger(newTitle, props.todolistId)
        dispatch(changeTodolistTitleAC(props.todolistId, newTitle))

    }, [dispatch, props.todolistId])
    const deleteTaskButtonHandler = useCallback((taskId: string) => {
        dispatch(removeTaskAC(props.todolistId, taskId))
    }, [dispatch, props.todolistId])
    const onChangeTaskCheckboxHandler = useCallback((taskId: string, isDone: boolean) => {
        dispatch(taskStatusChangerAC(props.todolistId, taskId, isDone))
    }, [dispatch, props.todolistId])
    const onTaskTitleChangeHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(taskTitleChangerAC(props.todolistId, taskId, newTitle))
    }, [dispatch, props.todolistId])


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
                    return (
                        <TaskComponent taskId={el.id}
                                       title={el.title}
                                       isDone={el.isDone}
                                       deleteTask={deleteTaskButtonHandler}
                                       onChangeTaskCheckboxHandler={onChangeTaskCheckboxHandler}
                                       onTaskTitleChangeHandler={onTaskTitleChangeHandler}
                                       key={el.id}/>)
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
})





