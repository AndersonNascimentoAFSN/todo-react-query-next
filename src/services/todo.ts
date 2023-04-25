
import { Task } from "@/types/task";
import { api } from "./api";

type CreateTodoProps = {
  todo: Task
}

type CompletedTodoProps = {
  id: string
  isCompleted: boolean
}

type RemoveTodoProps = {
  id: string
}


export async function createTodo({
  todo
}: CreateTodoProps) {
  const todoCreated = await api<Task>('http://localhost:3333/todo', {
    method: "POST",
    body: JSON.stringify(todo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })

  return todoCreated
}

export async function getTodoList() {
  const todos = await api<Task[]>('http://localhost:3333/todo')

  return todos
}



export async function RemoveTodo({
  id
}: RemoveTodoProps) {
  await api<Task>(`http://localhost:3333/todo/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
}

export async function completeTodo({
  id,
  isCompleted
}: CompletedTodoProps) {
  await api<Task>(`http://localhost:3333/todo/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isCompleted }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
}