import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type AppStatusStateType = {
    //происходит ли сейчас взаимодествие с сервером
    status: RequestStatusType,
    //если есть глобальная ошибка - запишется сюда
    error: string | null,
    //инициализировано ли приложение (проверка пользователя, получение настроек и т.д.)
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const AppStatusInitialState: AppStatusStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const appReducer = (state: AppStatusStateType = AppStatusInitialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)

export const setAppInitializedAC = (value: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    value
} as const)

export type setErrorActionType = ReturnType<typeof setAppErrorAC>
export type setStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

type ActionsType = setErrorActionType | setStatusActionType | setAppInitializedActionType

export const initializeAppTC = (): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                console.log('good')
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}