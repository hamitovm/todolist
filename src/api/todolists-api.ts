import axios from "axios";
import {DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";

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

//Общий дженерик тип - вместо D можно вставить уточнение, которое будет сидеть в data: D
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{ item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            title: title
        }, settings)
        return promise
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title},settings)
        return promise
    }

}