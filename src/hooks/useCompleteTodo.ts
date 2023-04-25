import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { completeTodo } from "../services/todo";
import { TodoService } from "../services/http/todo";

export function useCompleteTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ isCompleted, id }: { isCompleted: boolean, id: string }) => TodoService.completeTodo({ isCompleted, id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList'])
      },
    }
  )
}