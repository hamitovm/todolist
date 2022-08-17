import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

//Комбинируются разные редюсеры в один, в качестве свойства - ветка стейта, для которой редюсер предназначен
export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
//автоматическая типизация стейта через ReturnType<typeof --->
export type AppRootStateType = ReturnType<typeof rootReducer>

//Формируется стейт через корневой редюсер
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store