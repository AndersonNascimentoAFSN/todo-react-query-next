import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TodoService } from "../services/http/todo";
import { Task } from "@/types/task";

// Optimistic Updates (https://tanstack.com/query/v4/docs/react/guides/optimistic-updates)
// A atualização ocorre antes da requisição, ou seja, o estado do cache é atualizado antes da requisição. Caso a requisição falhe, o estado do cache é atualizado para o estado anterior. Caso a requisição seja bem sucedida, o estado do cache é atualizado para o estado atualizado.

export function useCompleteTodo() {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: TodoService.completeTodo,
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ['todoList'] })

      const tasks = queryClient.getQueryData<Task[]>(['todoList'])

      if (tasks) {
        const previousTask = tasks.filter((item) => item.id === task.id)[0] /* Foi necessário fazer isso, pois não está em uma tela de edição consequentemente não dá para utilizar uma query de id */

        queryClient.setQueryData(['todoList'],
          tasks.map((item) => {
            if (item.id === task.id) {
              return {
                id: task.id,
                isCompleted: task.isCompleted,
                description: previousTask.description
              }
            }
            return item
          })
        )
        return { previousTask, task, tasks }
      }
    },
    /* É importante definir o onError, pois em caso de erros durante um post, put, por exemplo, a task já foi marcada     como concluída, então é necessário desmarcá-la. */
    onError: (_err, task, context) => {
      if (!context) return
      queryClient.setQueryData(['todoList', task.id], context?.previousTask)
    },

    onSettled: (_newTodo, _error, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: ['todoList'] })
    },
  })

  return { mutateAsync }
}

/* // Com o código abaixo, é necessário invalidar a query para fazer a requisição novamente, pois o react-query não atualiza o estado do cache */

// export function useCompleteTodo() {
//   const queryClient = useQueryClient()

//   return useMutation(
//     ({ isCompleted, id }: { isCompleted: boolean, id: string }) => TodoService.completeTodo({ isCompleted, id }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['todoList'])
//       },
//     }
//   )
// }