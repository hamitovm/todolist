import {FilterValueType, TasksObjType, TodolistsType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionType = RemoveTaskACType
    | AddTaskACType
    | TaskStatusChangerACType
    | TaskTitleChangerACType
    | AddTodolistActionType
    | RemoveTodolistActionType

type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
type AddTaskACType = {
    type: 'ADD-TASK',
    todolistId: string,
    newTaskTitle: string
}
type TaskStatusChangerACType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    taskId: string,
    taskStatus: boolean
}

type TaskTitleChangerACType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    newTitle: string
}

//Action creators==========================================
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => ({
    type: 'REMOVE-TASK',
    todolistId: todolistId,
    taskId: taskId
})
export const addTaskAC = (todolistId: string, newTaskTitle: string): AddTaskACType => ({
    type: 'ADD-TASK',
    todolistId: todolistId,
    newTaskTitle: newTaskTitle
})
export const taskStatusChangerAC = (todolistId: string, taskId: string, taskStatus: boolean): TaskStatusChangerACType => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId: todolistId,
    taskId: taskId,
    taskStatus: taskStatus
})

export const taskTitleChangerAC = (todolistId: string, taskId: string, newTitle: string): TaskTitleChangerACType => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId: todolistId,
    taskId: taskId,
    newTitle: newTitle
})

export const tasksReducer = (state: TasksObjType, action: ActionType): TasksObjType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const changedTodolist = [...state[action.todolistId].filter(el => el.id !== action.taskId)]
            return {
                ...state,
                [action.todolistId]: changedTodolist
            }
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.newTaskTitle, isDone: false}
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }
        case 'CHANGE-TASK-STATUS':
            // const changedTask = {...state[action.todolistId].find(el => el.id === action.taskId),
            // isDone: action.taskStatus}
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => {
                    return el.id === action.taskId ?
                        {
                            ...el,
                            isDone: action.taskStatus
                        } :
                        el
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => {
                    return el.id === action.taskId ?
                        {
                            ...el,
                            title: action.newTitle
                        } :
                        el
                })
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            throw new Error("Action type error")
    }
}