'use client'

import { useCallback } from "react"

import { useCreateTodo } from "@/hooks/useCreateTodo"
import { CreateTodoForm, TodoForm } from "./TodoForm"
import { UseFormReset } from "react-hook-form"

export function WrapperTodoForm() {
  const { mutateAsync } = useCreateTodo()

  const onSubmitAddTodo = useCallback((todoData: CreateTodoForm, resetForm: UseFormReset<CreateTodoForm>) => {
    resetForm()
    return mutateAsync({ description: todoData.todo.description, isCompleted: false })
  }, [mutateAsync])

  return (
    <TodoForm onSubmitAddTodo={onSubmitAddTodo} />
  )
}
