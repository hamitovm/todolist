import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type  FilterValueType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filterValue: FilterValueType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []


export type TodolistsActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistsActionType |
    ChangeTodolistEntityStatusActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistDomainType
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}

type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id: string,
    status: RequestStatusType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistType>
}

//Action creators==========================================
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
})
export const addTodolistAC = (todolist: TodolistDomainType): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    todolist
})
export const changeTodolistTitleAC = (id: string, newTitle: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: newTitle
})
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
})
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType): ChangeTodolistEntityStatusActionType => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
})


export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => ({
    type: 'SET-TODOLISTS',
    todolists
})


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                action.todolist,
                ...state
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        // let todolistToChangeTitle = {...state.find(el => el.id === action.id)}
        // if (todolistToChangeTitle) {
        //     todolistToChangeTitle.title = action.title
        // }
        // return [
        //     ...state.map(el => {
        //         return (el.id === action.id ?
        //             {
        //                 ...el,
        //                 title: action.title
        //             } :
        //             el)
        //     })
        // ]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filterValue: action.filter} : el)

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filterValue: "All", entityStatus: "idle"}))
        default:
            return state
    }
}


// fetchTodolistsTC == fetchTodolistsThunkCreator
export const fetchTodolistsTC = (): AppThunk => {

    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then(response => {

                dispatch(setTodolistsAC(response.data))
                dispatch(setAppStatusAC("succeeded"))

            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTodolistsTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    let todolist: TodolistDomainType = {
                        ...res.data.data.item,
                        filterValue: "All",
                        entityStatus: "idle"
                    }
                    dispatch(addTodolistAC(todolist))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                        dispatch(setAppStatusAC("failed"))
                    }
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })

    }
}


