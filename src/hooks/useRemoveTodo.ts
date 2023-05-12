import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoService } from "../services/http/todo";
import { Task } from "@/types/task";


export function useRemoveTodo() {
  const queryClient = useQueryClient()

  return useMutation(
    {
      mutationFn: TodoService.removeTodo,
      onMutate: async ({ id }) => {
        const tasks = queryClient.getQueryData<Task[]>(['todoList'])
        return { tasks, id }
      },

      onError: (_err, _newTodo, context) => {
        queryClient.setQueryData(['todoList'], context?.tasks)
      },

      onSettled: (_newTodo, _error, _variables, context) => {

        if (!context) return

        queryClient.setQueryData(['todoList'],
          context?.tasks?.filter((item) => item.id !== context.id)
        )
      },
    }
  )
}

/* // Com o código abaixo, é necessário invalidar a query para fazer a requisição novamente, pois o react-query não atualiza o estado do cache */

// export function useRemoveTodo() {
//   const queryClient = useQueryClient()

//   return useMutation(
//     ({ id }: { id: string }) => TodoService.removeTodo({ id }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['todoList'])
//       },
//     }
//   )
// }