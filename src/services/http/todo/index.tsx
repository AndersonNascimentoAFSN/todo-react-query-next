import { Task } from "@/types/task"
import { api } from "@/services/api"

import { CompletedTodoProps, CreateTodoProps, GetTodoByIdProps, RemoveTodoProps } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL not found')
}

class Todo {
  async createTodo({
    description, isCompleted
  }: CreateTodoProps) {
    const todoCreated = await api<Task>(`${API_URL}/todo`, {
      method: "POST",
      body: JSON.stringify({ description, isCompleted }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    return todoCreated
  }

  async getTodoList() {
    const todos = await api<Task[]>(`${API_URL}/todo`)

    return todos
  }

  async getTodoById({
    id,
  }: GetTodoByIdProps) {
    const todos = await api<Task[]>(`${API_URL}/todo/${id}`)

    return todos
  }

  async removeTodo({
    id
  }: RemoveTodoProps) {
    await api<Task>(`${API_URL}/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
  }

  async completeTodo({
    id,
    isCompleted
  }: CompletedTodoProps) {
    await api<Task>(`${API_URL}/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isCompleted }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
  }
}

export const TodoService = new Todo()
