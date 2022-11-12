import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    addTaskTC, updateTaskTC, fetchTasksTC, removeTaskTC,
} from "./state/tasks-reducer";
import {
    changeTodolistFilterAC, removeTodolistsTC,
    FilterValueType, updateTodolistTitleTC
} from "./state/todolists-reducer";
import {TaskComponent} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {useAppDispatch} from "./state/hooks";

// export type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }

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
    //Общий диспатч редакса
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(fetchTasksTC(props.todolistId))
    }, [dispatch, props.todolistId])

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
    if (props.filterValue === 'Completed') {
        tasks = tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.filterValue === 'Active') {
        tasks = tasks.filter(el => el.status === TaskStatuses.New)
    }

    //Task adder ========================================================================
    const taskAdder = useCallback((inputValue: string) => {
        dispatch(addTaskTC(props.todolistId, inputValue))
    }, [dispatch, props.todolistId])

    // Установка фильтров тудулиста
    const onAllClickButtonHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todolistId, 'All'))
    }, [dispatch, props.todolistId])

    const onActiveClickButtonHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todolistId, 'Active'))
    }, [dispatch, props.todolistId])

    const onCompletedClickButtonHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todolistId, 'Completed'))
    }, [dispatch, props.todolistId])

    //Удаление тудулиста
    const onTodolistDeleteClickHandler = useCallback(() => {
        dispatch(removeTodolistsTC(props.todolistId))
    }, [dispatch, props.todolistId])

    const onTodolistTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(updateTodolistTitleTC(props.todolistId, newTitle))
    }, [dispatch, props.todolistId])

    const deleteTaskButtonHandler = useCallback((taskId: string) => {
        dispatch(removeTaskTC(props.todolistId, taskId))
        // dispatch(removeTaskAC(props.todolistId, taskId))
    }, [dispatch, props.todolistId])


    const onChangeTaskCheckboxHandler = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(props.todolistId, taskId, {status}))
    }, [dispatch, props.todolistId])

    const onTaskTitleChangeHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(props.todolistId, taskId, {title: newTitle}))
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
                                       status={el.status}
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





