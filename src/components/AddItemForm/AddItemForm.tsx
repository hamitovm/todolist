// AddItemFormPropsType ==============================================
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

type AddItemFormPropsType = {
    itemAdder: (inputValue: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({disabled = false, ...props}: AddItemFormPropsType) => {
    let [inputValue, setInputValue] = useState('')
    //Error setter ========================================================================
    let [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const onKeyPressInpitHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            onClickItemAdder()
            setInputValue('')
        }
    }
    const onClickItemAdder = () => {
        if (inputValue.trim() !== '') {
            props.itemAdder(inputValue.trim())
            setInputValue('')
            setError(null)
        } else {
            setError('Field is required')
        }
    }
    return (
        <div>
            <TextField value={inputValue}
                       disabled={disabled}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressInpitHandler}
                       type="text"
                // className={error ? 'error' : ''}
                       size={'small'}
                       variant={'outlined'}
                       error={!!error}
                       helperText={error}
                       label={'Type value'}
            />

            <IconButton onClick={onClickItemAdder} size={'medium'} disabled={disabled}>
                <AddCircleOutline fontSize={'inherit'}/>
            </IconButton>
            {/*Заменено helperText'ом*/}
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    )
})