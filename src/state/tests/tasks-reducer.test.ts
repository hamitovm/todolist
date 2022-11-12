import {v1} from 'uuid'
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    updateTaskAC,
} from "../tasks-reducer";
import {TasksObjType} from "../../App";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";

let todolistId1: string
let todolistId2: string
let taskId1: string
let taskId2: string
let taskId3: string
let taskId4: string

let startState: TasksObjType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    taskId1 = v1()
    taskId2 = v1()
    taskId3 = v1()
    taskId4 = v1()

    startState = {
        [todolistId1]: [
            {
                id: taskId1, title: 'CSS', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            },
            {
                id: taskId2, title: 'JS', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            }],
        [todolistId2]: [
            {
                id: taskId3, title: 'Python', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            },
            {
                id: taskId4, title: 'Django', description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            }]
    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC(todolistId1, taskId1))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1].every(el => el.id !== taskId1)).toBeTruthy()
    expect(endState[todolistId2].length).toBe(startState[todolistId2].length)
    expect(endState[todolistId1][0].id).toBe(taskId2)
})

test('new task should be added to correct todolist', () => {
    let newTaskTitle = 'New task'

    const endState = tasksReducer(startState, addTaskAC({
        id: taskId3, title: newTaskTitle, description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        todoListId: todolistId2,
        order: 0,
        addedDate: ''
    }))
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
    expect(endState[todolistId1].length).toBe(startState[todolistId1].length)
})

test('correct task should change status', () => {
    const taskStatus = TaskStatuses.Completed
    let endStateChangedStatus: TaskType = {
        id: taskId3, title: 'Python', description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        todoListId: todolistId1,
        order: 0,
        addedDate: ''
    }

    const endState = tasksReducer(startState, updateTaskAC(todolistId2, taskId4, {status: taskStatus}))
    let endStateChangedStatus1 = endState[todolistId2].find(el => el.id === taskId4)
    if (endStateChangedStatus1) {
        endStateChangedStatus = endStateChangedStatus1
    }

    expect(endStateChangedStatus.status).toBe(TaskStatuses.Completed)
})

test('correct task should change name', () => {

    let newTitle = 'React'

    let endStateChangedTitle: TaskType = {
        id: taskId3, title: 'Python', description: '',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        todoListId: todolistId1,
        order: 0,
        addedDate: ''
    }

    const endState = tasksReducer(startState, updateTaskAC(todolistId1, taskId2, {title: newTitle}))
    let endStateChangedTitle2 = endState[todolistId1].find(el => el.id === taskId2)
    if (endStateChangedTitle2) {
        endStateChangedTitle = endStateChangedTitle2
    }

    expect(endStateChangedTitle.title).toBe(newTitle)
})

test('new array should be added when new todolist added', () => {
    const action = addTodolistAC({id: 'todolistId3', title: 'What to learn', filterValue: 'All', addedDate:'', order: 0})
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC(todolistId2)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
})

test('empty arrays should be added when todolists were set', ()=> {
    const action = setTodolistsAC([
        {id: todolistId1, title: 'What to learn', addedDate:'', order: 0},
        {id: todolistId2, title: 'What to buy', addedDate:'', order: 0}
    ])

    const endState = tasksReducer({},action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState[todolistId1]).toBeDefined()
    expect(endState[todolistId2]).toBeDefined()

})


test('tasks should be added to state', ()=> {
    const action = setTasksAC([
        {
            id: taskId3, title: 'Python', description: '',
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: '',
            deadline: '',
            todoListId: todolistId1,
            order: 0,
            addedDate: ''
        },
        {
            id: taskId4, title: 'Django', description: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            startDate: '',
            deadline: '',
            todoListId: todolistId1,
            order: 0,
            addedDate: ''
        }], todolistId1)

    const endState = tasksReducer({[todolistId1]:[], [todolistId2]:[]},action)

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(0)

})