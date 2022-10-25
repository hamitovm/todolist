import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any[]>([])

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then(response => setState(response.data))

    }, [])
    return (
        <div>
            {state.map(el => {
                return <div>
                    <h4>
                        {el.title}
                    </h4>
                    <p>{el.id}</p>
                    <span>{JSON.stringify(el)}</span>
                </div>
            })}
        </div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    const [todolistTitle, setTodolistTitle] = useState<string>('')
    const onTodolistTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)
    }
    const onCreateTodolistButtonClick = () => {
        todolistsAPI.createTodolist(todolistTitle)
            .then(response => setState(response.data))
    }

    // useEffect(() => {
    //     todolistsAPI.createTodolist('some new todolist')
    //         .then(response => setState(response.data))
    // }, [])

    return (
        <div>
            <p>
                <input
                    placeholder='Enter todolist title'
                    value={todolistTitle}
                    onChange={onTodolistTitleInputChangeHandler}/>
            </p>
            <button onClick={onCreateTodolistButtonClick}>Create todolist</button>

            <p>
                Result: {JSON.stringify(state)}
            </p>

        </div>
    )
}



export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistToDeleteId, setTodolistToDeleteId] = useState<string>('')
    const onTodolistToDeleteIdInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistToDeleteId(e.currentTarget.value)
    }

    const onDeleteTodolistButtonClick = () => {
        todolistsAPI.deleteTodolist(todolistToDeleteId)
            .then(response => setState(response.data))
    }

    // useEffect(() => {
    //     const todolistId = 'd47a4741-70bb-4b9a-8871-3b2ccf854c46'
    //     todolistsAPI.deleteTodolist(todolistId)
    //         .then(response => setState(response.data))
    // }, [])

    return (
        <div>
            <p>
                <input
                    placeholder='Enter todolist id'
                    value={todolistToDeleteId}
                    onChange={onTodolistToDeleteIdInputChangeHandler}/>
            </p>
            <button onClick={onDeleteTodolistButtonClick}>Delete todolist</button>
            <p>
                Result: {JSON.stringify(state)}
            </p>

        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const onTodolistIdInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const [newTodolistTitle, setNewTodolistTitle] = useState<string>('')
    const onNewTodolistTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodolistTitle(e.currentTarget.value)
    }
    const onUpdateTodolistButtonClick = () => {
        todolistsAPI.updateTodolistTitle(todolistId, newTodolistTitle)
            .then(response => setState(response.data))
    }


    // useEffect(() => {
    //     const todolistId = 'db79b41a-7a65-49d6-b11b-aea18fcf7fff'
    //     todolistsAPI.updateTodolistTitle(todolistId, 'Todolist number 21-36')
    //         .then(response => setState(response.data))
    // }, [])

    return (
        <div>
            <p>
                <input
                    placeholder='Enter todolist ID'
                    value={todolistId}
                    onChange={onTodolistIdInputChangeHandler}/>
            </p>
            <p>
                <input
                    placeholder='Enter new todolist title'
                    value={newTodolistTitle}
                    onChange={onNewTodolistTitleInputChangeHandler}/>
            </p>
            <button onClick={onUpdateTodolistButtonClick}>Create task</button>

            <p>
                Result: {JSON.stringify(state)}
            </p>

        </div>
    )
}

//Tasks

export const GetTasks = () => {
    const [state, setState] = useState<any[]>([])
    const [result, setResult] = useState('')
    const [todolistId, setTodolistId] = useState<string>('')
    const onTodolistIdInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onGetTasksButtonClick = () => {
        setResult('...searhingTasks')
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                setResult('')
                setState(response.data.items)
            })
    }

    // useEffect(() => {
    //     const todolistId = 'db79b41a-7a65-49d6-b11b-aea18fcf7fff'
    //     todolistsAPI.getTasks(todolistId)
    //         .then(response => setState(response.data.items))
    //
    // }, [])
    return (
        <div>
            <div>
                <p>
                    <input
                        placeholder='Enter todolist id'
                        value={todolistId}
                        onChange={onTodolistIdInputChangeHandler}/>
                </p>
                <button onClick={onGetTasksButtonClick}>Get tasks</button>
            </div>
            <p>{result}</p>
            {state.length === 0 ?
                'No tasks' :
                state.map(el => {
                return <div>
                    <h4>
                        {el.title}
                    </h4>
                    <p>Task id : {el.id}</p>
                    <p>Todolist id : {el.todoListId}</p>
                    <span>{JSON.stringify(el)}</span>
                </div>
            })}
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const onTaskTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const [todolistId, setTodolistId] = useState<string>('')
    const onTodolistIdInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onCreateTaskButtonClick = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
                 .then(response => setState(response.data))
    }
    // useEffect(() => {
    //     const todolistId = 'db79b41a-7a65-49d6-b11b-aea18fcf7fff'
    //     const title = 'task to delete'
    //
    //     todolistsAPI.createTask(todolistId, title)
    //         .then(response => setState(response.data))
    //
    // }, [])

    // return <div>{JSON.stringify(state)}</div>
    return (
        <div>
            <p>
                <input
                    placeholder='Enter task title'
                    value={taskTitle}
                    onChange={onTaskTitleInputChangeHandler}/>
            </p>
            <p>
                <input
                    placeholder='Enter todolist ID'
                    value={todolistId}
                    onChange={onTodolistIdInputChangeHandler}/>
            </p>
            <button onClick={onCreateTaskButtonClick}>Create task</button>

            <p>
                Result: {JSON.stringify(state)}
            </p>

        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const onTodolistIdInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const [taskId, setTaskId] = useState<string>('')
    const onTaskIdInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onDeleteTaskButtonClick = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }


    // useEffect(() => {
    //     const todolistId = 'db79b41a-7a65-49d6-b11b-aea18fcf7fff'
    //     const taskId = 'a5d56a22-b209-4e2b-aef9-0275fb9c7a2a'
    //     // здесь мы будем делать запрос и ответ закидывать в стейт.
    //     // который в виде строки будем отображать в div-ке
    //     todolistsAPI.deleteTask(todolistId, taskId)
    //         .then(response => setState(response.data))
    //
    // }, [])
    return (
        <div>
            <p>
                <input
                    placeholder='Enter todolist ID'
                    value={todolistId}
                    onChange={onTodolistIdInputChangeHandler}/>
            </p>
            <p>
                <input
                    placeholder='Enter task id'
                    value={taskId}
                    onChange={onTaskIdInputChangeHandler}/>
            </p>

            <button onClick={onDeleteTaskButtonClick}>Delete task</button>

            <p>
                Result: {JSON.stringify(state)}
            </p>

        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskNewTitle, setTaskNewTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const onUpdateTaskButtonClick = () => {
        const updateTaskData = {
            title: taskNewTitle,
            description,
            status,
            priority,
            startDate,
            deadline,
        }
        todolistsAPI.updateTask(todolistId, taskId, updateTaskData)
            .then(response => setState(response.data))
    }

    return (
        <div>
            <p>
                <input
                    placeholder='Enter todolist ID'
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter task id'
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter new task title'
                    value={taskNewTitle}
                    onChange={ (e) => {
                        setTaskNewTitle(e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter task description'
                    value={description}
                    onChange={ (e) => {
                        setDescription(e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter task status'
                    value={status}
                    type='number'
                    onChange={ (e) => {
                        setStatus(+e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter task priority'
                    value={priority}
                    type='number'
                    onChange={ (e) => {
                        setPriority(+e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter task start date'
                    value={startDate}
                    onChange={ (e) => {
                        setStartDate(e.currentTarget.value)}}/>
            </p>
            <p>
                <input
                    placeholder='Enter task deadline'
                    value={deadline}
                    onChange={ (e) => {
                        setDeadline(e.currentTarget.value)}}/>
            </p>

            <button onClick={onUpdateTaskButtonClick}>Update task</button>

            <p>
                Result: {JSON.stringify(state)}
            </p>

        </div>
    )}