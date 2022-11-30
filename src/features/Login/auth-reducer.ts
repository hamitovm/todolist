import {addTaskAC, setTasksAC, updateTaskAC} from "../../state/tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppThunk, RootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";

const initialState: initialStateType = {
    isLoggedIn: false
}

export type initialStateType = {
    isLoggedIn: boolean
}

type ActionType = setIsLoggedInActionType

export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>



//Action creators==========================================
export const setIsLoggedInAC = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    value
} as const)


export const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state,
                isLoggedIn: action.value
            }
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
                    dispatch(setIsLoggedInAC(true))
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

export const logoutTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
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
