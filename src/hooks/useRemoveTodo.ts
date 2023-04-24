import { useMutation, useQueryClient } from "react-query";

import { RemoveTodo } from "../services/todo";

export function useRemoveTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id }: { id: string }) => RemoveTodo({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList'])
      },
    }
  )
}