import { Task } from "@/types/task"
import { api } from "@/services/api"

import { CompletedTodoProps, CreateTodoProps, GetTodoByIdProps, RemoveTodoProps } from "./types"

class Todo {
  async createTodo({
    description, isCompleted
  }: CreateTodoProps) {
    const todoCreated = await api<Task>('http://localhost:3333/todo', {
      method: "POST",
      body: JSON.stringify({ description, isCompleted }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })

    return todoCreated
  }

  async getTodoList() {
    const todos = await api<Task[]>('http://localhost:3333/todo')

    return todos
  }

  async getTodoById({
    id,
  }: GetTodoByIdProps) {
    const todos = await api<Task[]>(`http://localhost:3333/todo/${id}`)

    return todos
  }

  async removeTodo({
    id
  }: RemoveTodoProps) {
    await api<Task>(`http://localhost:3333/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
  }

  async completeTodo({
    id,
    isCompleted
  }: CompletedTodoProps) {
    await api<Task>(`http://localhost:3333/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isCompleted }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
  }
}

export const TodoService = new Todo()
