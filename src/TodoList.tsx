import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./app/store";
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC,} from "./state/tasks-reducer";
import {
    changeTodolistFilterAC,
    removeTodolistsTC,
    TodolistDomainType,
    updateTodolistTitleTC
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
    todolist: TodolistDomainType
    // Деморежим true - для storybook,
    // тогда тудулисты загружаются из initialState программы, не из сервера
    demo?: boolean
}


export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    //Общий диспатч редакса
    const dispatch = useAppDispatch()

    useEffect(()=> {
        //При demo === true диспатч не выполнится
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [dispatch, props.todolist.id])

    //Доставание стейта, в типизации первым параметром указывается тип стейта, вторым того, что берется из него
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolist.id])
    if (props.todolist.filterValue === 'Completed') {
        tasks = tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.todolist.filterValue === 'Active') {
        tasks = tasks.filter(el => el.status === TaskStatuses.New)
    }

    //Task adder ========================================================================
    const taskAdder = useCallback((inputValue: string) => {
        dispatch(addTaskTC(props.todolist.id, inputValue))
    }, [dispatch, props.todolist.id])

    // Установка фильтров тудулиста
    const onAllClickButtonHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todolist.id, 'All'))
    }, [dispatch, props.todolist.id])

    const onActiveClickButtonHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todolist.id, 'Active'))
    }, [dispatch, props.todolist.id])

    const onCompletedClickButtonHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(props.todolist.id, 'Completed'))
    }, [dispatch, props.todolist.id])

    //Удаление тудулиста
    const onTodolistDeleteClickHandler = useCallback(() => {
        dispatch(removeTodolistsTC(props.todolist.id))
    }, [dispatch, props.todolist.id])

    const onTodolistTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(updateTodolistTitleTC(props.todolist.id, newTitle))
    }, [dispatch, props.todolist.id])

    const deleteTaskButtonHandler = useCallback((taskId: string) => {
        dispatch(removeTaskTC(props.todolist.id, taskId))
        // dispatch(removeTaskAC(props.todolistId, taskId))
    }, [dispatch, props.todolist.id])


    const onChangeTaskCheckboxHandler = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(props.todolist.id, taskId, {status}))
    }, [dispatch, props.todolist.id])

    const onTaskTitleChangeHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(props.todolist.id, taskId, {title: newTitle}))
    }, [dispatch, props.todolist.id])


    return (
        <div>
            <div className="todolist_header">
                <h2>
                    <IconButton aria-label="delete"
                                disabled={props.todolist.entityStatus === 'loading'}
                                onClick={onTodolistDeleteClickHandler}
                                size={'small'}>
                        <Delete fontSize="small"/>
                    </IconButton>
                    <EditableSpan title={props.todolist.title} onChange={onTodolistTitleChangeHandler}/>
                </h2>
            </div>
            <AddItemForm itemAdder={taskAdder} disabled={props.todolist.entityStatus === 'loading'}/>
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
                <Button variant={props.todolist.filterValue === 'All' ? 'contained' : 'outlined'}
                    // className={props.filterValue === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickButtonHandler}>All
                </Button>
                <Button color={'primary'}
                        variant={props.todolist.filterValue === 'Active' ? 'contained' : 'outlined'}
                    // className={props.filterValue === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickButtonHandler}>Active
                </Button>
                <Button color={'secondary'}
                        variant={props.todolist.filterValue === 'Completed' ? 'contained' : 'outlined'}
                    // className={props.filterValue === 'Completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickButtonHandler}>Completed
                </Button>
            </div>
        </div>
    )
})





