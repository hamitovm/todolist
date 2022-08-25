import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from "react";
import {removeTaskAC, taskStatusChangerAC, taskTitleChangerAC} from "./state/tasks-reducer";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./TodoList";

export type TaskComponentPropsType = {
    taskId: string,
    title: string,
    isDone: boolean,
    deleteTask: (taskId: string) => void,
    onChangeTaskCheckboxHandler: (taskId: string, isDone: boolean) => void,
    onTaskTitleChangeHandler: (taskId: string, newTitle: string) => void
}

export const TaskComponent = (props: TaskComponentPropsType) => {
    const onChangeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeTaskCheckboxHandler(props.taskId, e.currentTarget.checked)
    },[])
    const onTaskTitleChangeHandler = useCallback((newTitle: string) => {
        props.onTaskTitleChangeHandler(props.taskId, newTitle)
    },[])


    return <div key={props.taskId} className={props.isDone ? 'is-done' : ''}>
        <IconButton aria-label="delete"
                    onClick={() => props.deleteTask(props.taskId)}
                    size="small">
            <Delete fontSize="small"/>
        </IconButton>
        <input
            type="checkbox"
            defaultChecked={props.isDone}
            onChange={onChangeCheckboxHandler}
        />
        <EditableSpan title={props.title} onChange={onTaskTitleChangeHandler}/>
    </div>
}