import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    todolistId: string
    title: string,
    tasks: Array<TaskType>
    taskRemover: (id: string) => void
    taskAdder: (inputValue: string) => void
    filterValue: FilterValueType
    setFilter: (filterValue: FilterValueType) => void
    taskStatusChanger: (taskId: string, isDone: boolean) => void
    setError: (errorValue: string | null) => void
    error: null | string
}


export function TodoList(props: PropsType) {
    let [inputValue, setInputValue] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressInpitHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null)
        if (event.charCode === 13) {
            props.taskAdder(inputValue)
            setInputValue('')
        }
    }
    const onClickButtonHandler = () => {
        if (inputValue.trim() !== '') {
            props.taskAdder(inputValue.trim())
            setInputValue('')
            props.setError(null)
        } else {
            props.setError('Field is required')
        }
    }
    const onAllClickButtonHandler = () => {
        props.setFilter('All')
    }
    const onActiveClickButtonHandler = () => {
        props.setFilter('Active')
    }
    const onCompletedClickButtonHandler = () => {
        props.setFilter('Completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressInpitHandler}
                       type="text"
                       className={props.error ? 'error' : ''}
                />

                <button onClick={onClickButtonHandler}>+</button>
                {props.error && <div className='error-message'>{props.error}</div>}
            </div>
            <ul>
                {props.tasks.map((el) => {
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.taskStatusChanger(el.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.taskRemover(el.id)}>X</button>
                            <input
                                type="checkbox"
                                defaultChecked={el.isDone}
                                onChange={onChangeCheckboxHandler}
                            />
                            <span className={el.isDone ? 'is-done' : ''}>{' ' + el.title}</span>
                        </li>

                    )
                })}
            </ul>
            <div>
                <button className={props.filterValue === 'All' ? 'active-filter' : ''} onClick={onAllClickButtonHandler}>All
                </button>
                <button className={props.filterValue === 'Active' ? 'active-filter' : ''} onClick={onActiveClickButtonHandler}>Active
                </button>
                <button className={props.filterValue === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClickButtonHandler}>Completed
                </button>
            </div>
        </div>
    )
}