import {Provider} from "react-redux";
import {AppRootStateType, store} from "../app/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filterValue: 'All', addedDate:'', order: 0},
        {id: 'todolistId2', title: 'What to buy', filterValue: 'All', addedDate:'', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''},
            {id: v1(), title: 'JS', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''},
            {id: v1(), title: 'React Book', description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''}
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