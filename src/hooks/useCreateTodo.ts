import { useMutation, useQueryClient } from "react-query";

import { createTodo } from "../services/todo";
import { Task } from "../@types/task";

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ todo }: { todo: Task }) => createTodo({ todo }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList'])
      },
    }
  )
}