import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "./store";

export type  FilterValueType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {
    filterValue: FilterValueType
}

const initialState: Array<TodolistDomainType> = []


export type TodolistsActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistsActionType
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
            let todolistToChangeTitle = {...state.find(el => el.id === action.id)}
            if (todolistToChangeTitle) {
                todolistToChangeTitle.title = action.title
            }
            return [
                ...state.map(el => {
                    return (el.id === action.id ?
                        {
                            ...el,
                            title: action.title
                        } :
                        el)
                })
            ]
        case 'CHANGE-TODOLIST-FILTER':
            let todolistToChangeFilter = {...state.find(el => el.id === action.id)}
            if (todolistToChangeFilter) {
                todolistToChangeFilter.filterValue = action.filter
            }
            return [
                ...state.map(el => {
                    return (el.id === action.id ?
                        {
                            ...el,
                            filterValue: action.filter
                        } :
                        el)
                })
            ]
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filterValue: "All"}))
        default:
            return state
    }
}


// fetchTodolistsTC == fetchTodolistsThunkCreator
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response.data))
            })
    }
}

export const removeTodolistsTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then(response => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(response => {
                let todolist: TodolistDomainType = {
                    ...response.data.data.item,
                    filterValue: "All"
                }
                dispatch(addTodolistAC(todolist))
            })
    }
}


