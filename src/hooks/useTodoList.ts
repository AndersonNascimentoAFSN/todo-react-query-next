import { useQuery } from "@tanstack/react-query";

import { TodoService } from "../services/http/todo";


export function useTodoList() {
  const oneMinute = 1000 * 60

  const { data, isLoading, error, isError, isFetching, isSuccess, status } = useQuery({
    queryKey: ['todoList'],
    queryFn: TodoService.getTodoList,
    staleTime: oneMinute * 30
  },
  )
  return { data, isLoading, error, isError, isFetching, isSuccess, status }
}

// export function useTodoList() {
//   const oneMinute = 1000 * 60

//   return useQuery(['todoList'], () => TodoService.getTodoList(),
//     {
//       staleTime: oneMinute * 30,
//     }
//   )
// }
