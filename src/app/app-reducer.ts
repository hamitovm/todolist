export type AppStatusStateType = {
    status: RequestStatusType,
    error: string | null
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const AppStatusInitialState: AppStatusStateType = {
    status: "idle",
    error: null
}

export const appReducer = (state: AppStatusStateType = AppStatusInitialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
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

export type setErrorActionType = ReturnType<typeof setAppErrorAC>
export type setStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = setErrorActionType | setStatusActionType