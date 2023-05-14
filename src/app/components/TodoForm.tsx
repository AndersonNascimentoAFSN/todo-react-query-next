'use client'

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreateTodo } from "@/hooks/useCreateTodo"
import { Button } from "./Button"
import { Form } from "./Form";

const schemaCreateTodo = z.object({
  todo: z.object({
    description: z.string().min(1, 'É necessário informar uma descrição para a tarefa.'),
  })
})

type CreateTodoForm = z.infer<typeof schemaCreateTodo>

export function TodoForm() {
  const { mutateAsync } = useCreateTodo()

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

  const { handleSubmit, formState: { isSubmitting } } = createTodoForm

  function handleSubmitAddTodo(todoData: CreateTodoForm) {
    mutateAsync(todoData)
  }

  return (
    <FormProvider {...createTodoForm}>
      <form
        onSubmit={handleSubmit(handleSubmitAddTodo)}
        className="w-screen p-10 flex gap-4"
      >
        <Form.Field>
          <Form.Input name="todo.description" placeholder="Adicione uma tarefa" className="flex-1"/>
          <Form.ErrorMessage field="todo.description" />
        </Form.Field>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Adicionar
        </Button>
      </form>
    </FormProvider>
  )
}