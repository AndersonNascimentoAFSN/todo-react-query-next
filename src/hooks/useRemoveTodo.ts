import { useMutation, useQueryClient } from "@tanstack/react-query";
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