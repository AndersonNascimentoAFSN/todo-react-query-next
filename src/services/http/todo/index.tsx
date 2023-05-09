
import { Task } from "@/types/task";
import { api } from "../../api";

type CreateTodoProps = {
  todo: Task
}

type RemoveTodoProps = {
  id: string
}

type GetTodoByIdProps = {
  id: string
}

type CompletedTodoProps = {
  id: string
  isCompleted: boolean
}

class Todo {
  async createTodo({
    todo
  }: CreateTodoProps) {
    const todoCreated = await api<Task>('http://localhost:3333/todo', {
      method: "POST",
      body: JSON.stringify(todo),
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
