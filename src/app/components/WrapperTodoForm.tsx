'use client'

import { useCreateTodo } from "@/hooks/useCreateTodo"
import { CreateTodoForm, TodoForm } from "./TodoForm"

export function WrapperTodoForm() {
  const { mutateAsync } = useCreateTodo()

  function onSubmitAddTodo(todoData: CreateTodoForm) {
    mutateAsync(todoData)
  }
  return (
    <TodoForm onSubmitAddTodo={onSubmitAddTodo} />
  )
}
