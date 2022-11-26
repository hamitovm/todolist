import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [inputValue, setInputValue] = useState('')
    //Error setter ========================================================================
    let [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressInpitHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13 && inputValue.trim() !== '') {
            props.onChange(inputValue)
            activateViewMode()
        }
    }

    const activateEditMode = () => {
        setEditMode(true)
        setInputValue(props.title)
    }
    const activateViewMode = useCallback(() => {
        setEditMode(false)
        if (inputValue.trim() !== '') {
            props.onChange(inputValue)
        }
    }, [inputValue])

    let EditableSpanElement = <span onDoubleClick={activateEditMode}>{props.title}</span>
    if (editMode) {
        EditableSpanElement = <TextField value={inputValue}
                                     onChange={onChangeInputHandler}
                                     onKeyPress={onKeyPressInpitHandler}
                                     onBlur={activateViewMode}
                                         variant={'standard'}
                                     type="text"
                                     autoFocus
                                         error={!!error}
                                     // className={error ? 'error' : ''}
                                         helperText={error}
                                         label={'Type value'}


        />
    }
    return (
        <span>
            {EditableSpanElement}
        </span>

    )
})