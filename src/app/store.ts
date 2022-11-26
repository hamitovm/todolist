import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistsActionType, todolistsReducer} from "../state/todolists-reducer";
import {TasksActionType, tasksReducer} from "../state/tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UserActionType} from "../state/user-reducer";

//Комбинируются разные редюсеры в один, в качестве свойства - ветка стейта, для которой редюсер предназначен
export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
//автоматическая типизация стейта через ReturnType<typeof --->
export type AppRootStateType = ReturnType<typeof rootReducer>


//Формируется стейт через корневой редюсер
//applyMiddleware(thunk) - thunk импортирован от redux-thunk (установлен через yarn add redux-thunk),
//нужен для того, что все работало при диспатче thunk,
// т.к. без этого без ошибок диспатчить можно только экшн-криейторы
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type ActionType = TodolistsActionType | TasksActionType | UserActionType
//Типизация того, что может приниматься диспатчем - из документации https://redux.js.org/usage/usage-with-typescript
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionType>
export type RootState = ReturnType<typeof store.getState>

//Типизация санки - из документации https://redux.js.org/usage/usage-with-typescript
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionType>

// @ts-ignore
window.store = store