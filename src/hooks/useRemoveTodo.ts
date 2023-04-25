import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { RemoveTodo } from "../services/todo";
import { TodoService } from "../services/http/todo";

export function useRemoveTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id }: { id: string }) => TodoService.removeTodo({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList'])
      },
    }
  )
}