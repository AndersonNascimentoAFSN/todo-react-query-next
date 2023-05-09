import { useQuery } from "@tanstack/react-query";

import { TodoService } from "../services/http/todo";

export function useTodoById({ id }: { id: string }) {
  const oneMinute = 1000 * 60

  return useQuery({
    queryKey: ['todoList', id],
    queryFn: () => TodoService.getTodoById({ id }),
    staleTime: oneMinute * 30
  },
  )
}

// export function useTodoById({ id }: { id: string }) {
//   const oneMinute = 1000 * 60

//   return useQuery(['todoList', id], () => TodoService.getTodoById({ id }),
//     {
//       staleTime: oneMinute * 30,
//     }
//   )
// }