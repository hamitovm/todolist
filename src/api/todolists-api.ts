import axios from "axios";

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
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

//Данные о том, что означает каждый номер статуса в тасках
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
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

export type UpdateTaskModelType = {
    title: string
    description: string
    status:number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
            title: title
        })
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
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
    updateTask(todolistId: string, taskId: string, updateTaskData: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateTaskData)
    },
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
    },
}


