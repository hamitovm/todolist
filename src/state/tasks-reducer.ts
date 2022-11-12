import {TasksObjType} from "../App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppThunk, RootState} from "./store";

const initialState: TasksObjType = {}

export type TasksActionType = RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksACType

type RemoveTaskACType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
type AddTaskACType = {
    type: 'ADD-TASK',
    newTask: TaskType
}
type UpdateTaskACType = {
    type: 'UPDATE-TASK',
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskModelType
}

type TaskTitleChangerACType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    newTitle: string
}
type SetTasksACType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}

//Action creators==========================================
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => ({
    type: 'REMOVE-TASK',
    todolistId: todolistId,
    taskId: taskId
})
export const addTaskAC = (newTask: TaskType): AddTaskACType => ({
    type: 'ADD-TASK',
    newTask

})
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskACType => ({
    type: 'UPDATE-TASK',
    todolistId: todolistId,
    taskId: taskId,
    model
})

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksACType => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
})

export const tasksReducer = (state: TasksObjType = initialState, action: TasksActionType): TasksObjType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const changedTodolist = [...state[action.todolistId].filter(el => el.id !== action.taskId)]
            return {
                ...state,
                [action.todolistId]: changedTodolist
            }
        case 'ADD-TASK':
            const newTask: TaskType = action.newTask
            return {
                ...state,
                [action.newTask.todoListId]: [newTask, ...state[action.newTask.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => {
                    return el.id === action.taskId ?
                        {
                            ...el,
                            ...action.model
                        } :
                        el
                })
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(el => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            let stateCopy = {...state}
            action.tasks.forEach(el => {
                stateCopy[action.todolistId] = [...action.tasks]
            })
            return {...stateCopy}
        }
        default:
            return state
    }
}


export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC(response.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
// UpdateDomainTaskModelType - создан для того, что при изменении
// только одного из параметров таски, в Санк Криейтор можно было передать только его
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?:number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string,
                             taskId: string,
                             domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch,
            getState: () => RootState) => {
        const state = getState()
        const taskToUpdate = state.tasks[todolistId].find(el => el.id === taskId)
        if (!taskToUpdate) {
            // throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const model : UpdateTaskModelType = {
            title: taskToUpdate.title,
            description: taskToUpdate.description,
            status: taskToUpdate.status,
            priority: taskToUpdate.priority,
            startDate: taskToUpdate.startDate,
            deadline: taskToUpdate.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, model))
            })
    }
}
