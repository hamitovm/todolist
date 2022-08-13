import {FilterValueType, TodolistsType} from "../App";
import {v1} from 'uuid'

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
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

//Action creators==========================================
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
})
export const addTodolistAC = (title: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
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

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: action.todolistId, title: action.title, filterValue: 'All'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            let todolistToChangeTitle = {...state.find(el => el.id === action.id)}
            if (todolistToChangeTitle) {
                todolistToChangeTitle.title = action.title
            }
            return [
                ...state.map(el => {
                    return (el.id === action.id ?
                        {...el,
                        title: action.title} :
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
                        {...el,
                            filterValue: action.filter} :
                        el)
                })
            ]
        default:
            throw new Error("Action type error")
    }
}