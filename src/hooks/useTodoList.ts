import { getTodoList } from "@/services/todo";
import { useQuery } from "react-query";


export function useTodoList() {
  const oneMinute = 1000 * 60

  return useQuery(['todoList'], () => getTodoList(),
    {
      staleTime: oneMinute * 30,
    }
  )
}