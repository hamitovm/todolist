import {Provider} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filterValue: 'all'},
        {id: 'todolistId2', title: 'What to buy', filterValue: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

// Стор для storybook истории
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


//Декоратор — это способ обернуть историю дополнительными функциями «рендеринга».
// Многие надстройки определяют декораторы, чтобы дополнить ваши истории
// дополнительным рендерингом или собрать информацию о том, как ваша история
// отображается.
//Конкретно этот декоратор оборачивает входящую функцию (компоненту) в провайдер со стором storyBookStore.
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}> {story()} </Provider>
}