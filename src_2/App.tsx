import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {TodolistType} from "../src/api/todolists-api";
import {TodolistDomainType} from "../src/state/todolists-reducer";

export type  FilterValueType = 'All' | 'Active' | 'Completed'

// type TodolistsType = {
//     id: string
//     title: string
//     filterValue: FilterValueType
// }

function App() {
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: v1(), title: 'What to learn', filterValue: 'All', addedDate:'', order: 0},
        {id: v1(), title: 'What to buy', filterValue: 'All', addedDate:'', order: 0},
    ])

    type TaskType = {
        id: string
        title: string
        isDone: boolean
    }

    let [task1, setTask1] = useState<Array<TaskType>>([
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    )

    let [error, setError] = useState<string | null>(null)

    //Task remover ========================================================================
    const removeTask = (id: string) => {

        setTask1(task1.filter((el: TaskType) => el.id !== id))
    }
    //Task adder ========================================================================
    const taskAdder = (inputValue: string) => {
        let newTask: TaskType = {id: v1(), title: inputValue, isDone: false}
        let newTasks = [newTask, ...task1]
        setTask1(newTasks)
    }

    //For filter button ====================================================================
    const [filterValue, setbtnValue] = useState<FilterValueType >('All')
    let filteredTask1 = task1
    if (filterValue === 'Active') {
        filteredTask1 = task1.filter((el: TaskType) => !el.isDone)
    }
    if (filterValue === 'Completed') {
        filteredTask1 = task1.filter((el: TaskType) => el.isDone)
    }

    const setFilter = (filterValue: FilterValueType) => {
        setbtnValue(filterValue)
    }

   const taskStatusChanger = (taskId: string, isDone: boolean) => {
        let task = task1.find(el => el.id === taskId)
        if (task) {task.isDone = isDone}
        let copyTask = [...task1]
        setTask1(copyTask)
    }

    // let todolists = [
    //     { id: v1(), title: 'What to learn', filter: 'Active'},
    //     { id: v1(), title: 'What to buy', filter: 'Completed'},
    // ]

    return (
        <div className="App">
            <div>
                <h1>Hello</h1>
            </div>
            {todolists.map( el => {
                return (
                    <TodoList
                        todolistId={el.id}
                        title={el.title}
                        tasks={filteredTask1}
                        taskRemover={removeTask}
                        filterValue={el.filterValue}
                        setFilter={setFilter}
                        taskAdder={taskAdder}
                        taskStatusChanger={taskStatusChanger}
                        setError={setError}
                        error={error}
                    />
                )
            })}
        </div>
    )
}

export default App;
