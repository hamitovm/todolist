import axios from "axios";
import {DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";

const instance = axios.create({
    //Как указано в спецификации www.w3.org/TR/cors/#omit-credentials-flag,
    // withCredentials позволяет нам использовать в запросе к серверу user-credentials,
    // т.е. куки, аутентификационные данные и клиентские SSL-сертификаты.
    //в post, get - запросах объект с withCredentials пишется вторым параметом
    //в delete, put - запросах объект с withCredentials пишется третим параметом
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    //    headers - API key - ключ доступа
    headers: {
        'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
    }
})

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
    }
}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

//Общий дженерик тип - вместо D можно вставить уточнение, которое будет сидеть в data: D,
// D = {} - если вместо D ничего не вставлено, то по умолчанию будет устанавливаться пустой объект {}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: TaskType[],
    totalCount: number,
    error: string | null
}

type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status:number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
            title: title
        })
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`,
            {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    },
}