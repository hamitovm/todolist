import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, RootState} from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC("failed"))
    }
}

export const handleServerNetworkError = (error: any, dispatch: ThunkDispatch<RootState, unknown, ActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error was occured'))
    dispatch(setAppStatusAC("failed"))
}

