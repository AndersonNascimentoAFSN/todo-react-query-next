'use client'

import { useCallback } from "react"
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreateTodo } from "@/hooks/useCreateTodo"
import { TodoForm } from "./TodoForm"

const schemaCreateTodo = z.object({
  todo: z.object({
    description: z.string().min(1, 'É necessário informar uma descrição para a tarefa.'),
  })
})

export type CreateTodoForm = z.infer<typeof schemaCreateTodo>

export function WrapperTodoForm() {
  const createTodoForm = useForm<CreateTodoForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaCreateTodo),
    defaultValues: {
      todo: {
        description: ''
      }
    },
  })

  const { reset } = createTodoForm

  const { mutateAsync } = useCreateTodo()

  const onSubmitAddTodo = useCallback((todoData: CreateTodoForm) => {
    reset()
    return mutateAsync(todoData)
  }, [mutateAsync, reset])

  return (
    <FormProvider {...createTodoForm}>
      <TodoForm onSubmitAddTodo={onSubmitAddTodo} />
    </FormProvider>
  )
}
