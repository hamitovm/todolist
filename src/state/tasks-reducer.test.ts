
import {v1} from 'uuid'
import {addTaskAC, removeTaskAC, tasksReducer, taskStatusChangerAC, taskTitleChangerAC} from "./tasks-reducer";
import {TasksObjType} from "../App";
import {TaskType} from "../TodoList";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId1 = v1()
    let taskId2 = v1()
    let taskId3 = v1()
    let taskId4 = v1()

    const startState: TasksObjType = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS', isDone: true},
            {id: taskId2, title: 'JS', isDone: true}],
        [todolistId2]: [
            {id: taskId3, title: 'Python', isDone: true},
            {id: taskId4, title: 'Django', isDone: false}]
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, taskId1))
    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1].every( el => el.id !== taskId1)).toBeTruthy()
    expect(endState[todolistId2].length).toBe(startState[todolistId2].length)
    expect(endState[todolistId1][0].id).toBe(taskId2)
})

test(' new task should be added to correct todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId1 = v1()
    let taskId2 = v1()
    let taskId3 = v1()
    let taskId4 = v1()

    const startState: TasksObjType = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS', isDone: true},
            {id: taskId2, title: 'JS', isDone: true}],
        [todolistId2]: [
            {id: taskId3, title: 'Python', isDone: true},
            {id: taskId4, title: 'Django', isDone: false}]
    }

    let newTaskTitle = 'New task'

    const endState = tasksReducer(startState, addTaskAC(todolistId2, newTaskTitle))
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][2].title).toBe(newTaskTitle)
    expect(endState[todolistId1].length).toBe(startState[todolistId1].length)
})

test('correct task should change status', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId1 = v1()
    let taskId2 = v1()
    let taskId3 = v1()
    let taskId4 = v1()

    const startState: TasksObjType = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS', isDone: true},
            {id: taskId2, title: 'JS', isDone: true}],
        [todolistId2]: [
            {id: taskId3, title: 'Python', isDone: true},
            {id: taskId4, title: 'Django', isDone: false}]
    }

    const taskStatus = true
    const startStateChangedStatus = startState[todolistId2].find(el => el.id === taskId4)
    let endStateChangedStatus: TaskType = {id: taskId3, title: 'Python', isDone: true}

    const endState = tasksReducer(startState, taskStatusChangerAC(todolistId2, taskId4, taskStatus))
    let endStateChangedStatus1 = endState[todolistId2].find(el => el.id === taskId4)
    if (endStateChangedStatus1) {
        endStateChangedStatus = endStateChangedStatus1
    }

    expect(endStateChangedStatus.isDone).toBe(true)
})

test('correct task should change name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId1 = v1()
    let taskId2 = v1()
    let taskId3 = v1()
    let taskId4 = v1()

    const startState: TasksObjType = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS', isDone: true},
            {id: taskId2, title: 'JS', isDone: true}],
        [todolistId2]: [
            {id: taskId3, title: 'Python', isDone: true},
            {id: taskId4, title: 'Django', isDone: false}]
    }

    let newTitle = 'React'

    const startStateChangedTitle = startState[todolistId1].find(el => el.id === taskId2)
    let endStateChangedTitle: TaskType = {id: taskId3, title: 'Python', isDone: true}

    const endState = tasksReducer(startState, taskTitleChangerAC(todolistId1, taskId2, newTitle))
    let endStateChangedTitle2 = endState[todolistId1].find(el => el.id === taskId2)
    if (endStateChangedTitle2) {
        endStateChangedTitle = endStateChangedTitle2
    }

    expect(endStateChangedTitle.title).toBe(newTitle)
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksObjType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksObjType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})