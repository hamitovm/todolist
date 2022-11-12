import {addTodolistAC, TodolistDomainType, todolistsReducer} from "../todolists-reducer";
import {tasksReducer} from "../tasks-reducer";
import {TasksObjType} from "../../App";

test('ids should be equals', () => {
    const startTasksState: TasksObjType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC({id: 'todolistId3', title: 'What to learn', filterValue: 'All', addedDate:'', order: 0})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})