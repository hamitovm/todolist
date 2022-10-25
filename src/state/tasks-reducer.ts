import {TasksObjType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


let todoListID1 = v1()
let todoListID2 = v1()

const initialState:TasksObjType = {
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
    taskStatus: TaskStatuses
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
export const taskStatusChangerAC = (todolistId: string, taskId: string, taskStatus: TaskStatuses): TaskStatusChangerACType => ({
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

export const tasksReducer = (state: TasksObjType = initialState, action: ActionType): TasksObjType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const changedTodolist = [...state[action.todolistId].filter(el => el.id !== action.taskId)]
            return {
                ...state,
                [action.todolistId]: changedTodolist
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                description: '',
                title: action.newTaskTitle,
                status: TaskStatuses.New,
                priority: TaskPriorities.Later,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.todolistId,
                order: 0,
                addedDate: '',
            }
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => {
                    return el.id === action.taskId ?
                        {
                            ...el,
                            status: action.taskStatus
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

            const stateToReturn =  {
                ...state,
                [action.todolistId]: []
            }
            return stateToReturn
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}