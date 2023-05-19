import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoService } from "../services/http/todo";
import { Task } from "@/types/task";

// Optimistic Updates (https://tanstack.com/query/v4/docs/react/guides/optimistic-updates)
// A atualização ocorre antes da requisição, ou seja, o estado do cache é atualizado antes da requisição. Caso a requisição falhe, o estado do cache é atualizado para o estado anterior. Caso a requisição seja bem sucedida, o estado do cache é atualizado para o estado atualizado.

export function useRemoveTodo() {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(
    {
      mutationFn: TodoService.removeTodo,
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: ['todoList'] })

        const previousTasks = queryClient.getQueryData<Task[]>(['todoList'])

        queryClient.setQueryData(['todoList'],
        previousTasks?.filter((item) => item.id !== id)
      )

        return { previousTasks }
      },

      onError: (_err, _newTodo, context) => {
        queryClient.setQueryData(['todoList'], context?.previousTasks)
      },

      onSettled: (_newTodo, _error, _variables, _context) => {
        queryClient.invalidateQueries({ queryKey: ['todoList'] })
      },
    }
  )

  return { mutateAsync }
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