import {FilterValueType, TodolistsType} from "../App";
import {v1} from 'uuid'

export type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType
type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
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
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    id: todolistId
})
export const AddTodolistAC = (title: string): AddTodolistActionType => ({
    type: 'ADD-TODOLIST',
    title: title
})
export const ChangeTodolistTitleAC = (id: string, newTitle: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: newTitle
})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
})

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: v1(), title: action.title, filterValue: 'All'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            let todolistToChangeTitle = {...state.find(el => el.id === action.id)}
            if (todolistToChangeTitle) {
                todolistToChangeTitle.title = action.title
            }
            return [
                ...state.filter(el => el.id !== action.id),
                todolistToChangeTitle
            ]
        case 'CHANGE-TODOLIST-FILTER':
            let todolistToChangeFilter = {...state.find(el => el.id === action.id)}
            if (todolistToChangeFilter) {
                todolistToChangeFilter.filterValue = action.filter
            }
            return [
                ...state.filter(el => el.id !== action.id),
                todolistToChangeFilter
            ]
        default:
            throw new Error("Action type error")
    }
}