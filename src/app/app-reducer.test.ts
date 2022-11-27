import {appReducer, AppStatusStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: AppStatusStateType = {
    status: 'idle',
    error: null
}

test('error must be set', () => {
    let error = 'New error'
    const endState = appReducer(startState, setAppErrorAC(error))

    expect(endState.error).toBe(error)
})

test('status must be set', () => {
    let status: RequestStatusType = 'loading'
    const endState = appReducer(startState, setAppStatusAC(status))

    expect(endState.status).toBe(status)
})

