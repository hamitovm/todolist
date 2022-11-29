import {addTaskAC, setTasksAC, updateTaskAC} from "../../state/tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunk, RootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";

const initialState: initialStateType = {}

export type initialStateType = {}

export type LoginActionType = {type: 'f'}



//Action creators==========================================
// export const removeTaskAC = (todolistId: string, taskId: string): LoginActionType => ({
//     type: 'REMOVE-TASK',
//     todolistId: todolistId,
//     taskId: taskId
// })


export const loginsReducer = (state: initialStateType = initialState, action: LoginActionType): initialStateType => {
    switch (action.type) {
        // case 'REMOVE-TASK':
        //     return {
        //         ...state
        //     }
        default:
            return state
    }
}


export const loginTC = (data: LoginParamsType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then(response => {
                if (response.data.resultCode === 0) {
                    alert('Ura')
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(response.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
