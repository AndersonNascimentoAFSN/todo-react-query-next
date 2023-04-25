import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types/task";
// import { createTodo } from "../services/todo";
import { TodoService } from "../services/http/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ todo }: { todo: Task }) => TodoService.createTodo({ todo }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todoList'])
      },
    }
  )
}