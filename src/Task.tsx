import React, {ChangeEvent, useCallback} from "react";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses} from "./api/todolists-api";

export type TaskComponentPropsType = {
    taskId: string,
    title: string,
    status: TaskStatuses,
    deleteTask: (taskId: string) => void,
    onChangeTaskCheckboxHandler: (taskId: string, status: TaskStatuses) => void,
    onTaskTitleChangeHandler: (taskId: string, newTitle: string) => void
}

export const TaskComponent = (props: TaskComponentPropsType) => {
    const onChangeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeTaskCheckboxHandler(props.taskId, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    },[])
    const onTaskTitleChangeHandler = useCallback((newTitle: string) => {
        props.onTaskTitleChangeHandler(props.taskId, newTitle)
    },[])


    return <div key={props.taskId} className={props.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <IconButton aria-label="delete"
                    onClick={() => props.deleteTask(props.taskId)}
                    size="small">
            <Delete fontSize="small"/>
        </IconButton>
        <input
            type="checkbox"
            defaultChecked={props.status === TaskStatuses.Completed}
            onChange={onChangeCheckboxHandler}
        />
        <EditableSpan title={props.title} onChange={onTaskTitleChangeHandler}/>
    </div>
}