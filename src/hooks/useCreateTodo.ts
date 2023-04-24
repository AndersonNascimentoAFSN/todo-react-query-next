import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types/task";
import { createTodo } from "../services/todo";

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