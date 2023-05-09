import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TodoService } from "../services/http/todo";
import { Task } from "@/types/task";


export function useCompleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TodoService.completeTodo,
    onMutate: async (task) => {
      const tasks = queryClient.getQueryData<Task[]>(['todoList'])

      if (tasks) {
        const previousTask = tasks.filter((item) => item.id === task.id)[0] /* Foi necessário fazer isso, pois não está em uma tela de edição consequentemente não dá para utilizar uma query de id */
        return { previousTask, task, tasks }
      }

    },
    onError: (_err, task, context) => {
      if (!context) return

      queryClient.setQueryData(['todoList', task.id], context?.previousTask)
    },
    onSettled: (_newTodo, _error, _variables, context) => {

      if (!context) return

      queryClient.setQueryData(['todoList'],
        context.tasks.map((item) => {
          if (item.id === context.task.id) {
            return {
              id: context.task.id,
              isCompleted: context.task.isCompleted,
              description: context.previousTask.description
            }
          }
          return item
        })
      )
    },
  })
}

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