import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TodoService } from "../services/http/todo";
import { Task } from "@/types/task";


export function useCompleteTodo() {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: TodoService.completeTodo,
    onMutate: async (task) => {
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
    /* Analisar melhor como implementar essa parte de onError... em caso de erros durante um post, por exemplo.
      Durante um post pode ser que haja um erro, mas task já foi marcada como concluída, então é necessário desmarcá-la.
    */
    // onError: (_err, task, context) => { 
    //   if (!context) return
    //   // queryClient.setQueryData(['todoList', task.id], context?.previousTask)

    //   queryClient.setQueryData(['todoList'],
    //   context.tasks.map((item) => {
    //     if (item.id === context.task.id) {
    //       return {
    //         id: context.previousTask.id,
    //         isCompleted: context.previousTask.isCompleted,
    //         description: context.previousTask.description
    //       }
    //     }
    //     return item
    //   })
    // )
    // },
    onSettled: (_newTodo, error, _variables, context) => {
      if (error) return

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