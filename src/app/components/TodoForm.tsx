'use client'

import { z } from "zod";
import { FormProvider, UseFormReset, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "./Button"
import { Form } from "./Form";

const schemaCreateTodo = z.object({
  todo: z.object({
    description: z.string().min(1, 'É necessário informar uma descrição para a tarefa.'),
  })
})

export type CreateTodoForm = z.infer<typeof schemaCreateTodo>

type TodoFormProps = {
  onSubmitAddTodo: (todoData: CreateTodoForm, resetForm: UseFormReset<CreateTodoForm>) => void
}

export function TodoForm({ onSubmitAddTodo }: TodoFormProps) {
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

  const { handleSubmit, formState: { isSubmitting }, reset } = createTodoForm

  return (
    <FormProvider {...createTodoForm}>
      <form
        onSubmit={handleSubmit(() => onSubmitAddTodo(createTodoForm.getValues(), reset))}
        className="w-screen p-10"
      >
        <div className="flex gap-4">
          <Form.Field>
            <Form.Input
              name="todo.description"
              placeholder="Adicione uma tarefa"
              className="flex-1"
              aria-label="todo.description"
            />
          </Form.Field>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            Adicionar
          </Button>
        </div>

        <Form.ErrorMessage field="todo.description" />
      </form>
    </FormProvider>
  )
}