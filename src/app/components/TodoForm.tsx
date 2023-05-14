'use client'

import { useFormContext } from 'react-hook-form'

import { Button } from "./Button"
import { Form } from "./Form";
import { CreateTodoForm } from "./WrapperTodoForm";

type TodoFormProps = {
  onSubmitAddTodo: (todoData: CreateTodoForm) => void
}

export function TodoForm({ onSubmitAddTodo }: TodoFormProps) {
  const { handleSubmit, formState: { isSubmitting } } = useFormContext<CreateTodoForm>()

  return (
    <form
      onSubmit={handleSubmit(onSubmitAddTodo)}
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
  )
}