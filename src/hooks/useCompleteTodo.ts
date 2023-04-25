import { useMutation, useQueryClient } from "@tanstack/react-query";

import { completeTodo } from "../services/todo";

export function useCompleteTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ isCompleted, id }: { isCompleted: boolean, id: string }) => completeTodo({ isCompleted, id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList'])
      },
    }
  )
}