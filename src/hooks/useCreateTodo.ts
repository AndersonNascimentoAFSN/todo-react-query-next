import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types/task";

import { TodoService } from "../services/http/todo";

// Optimistic Updates (https://tanstack.com/query/v4/docs/react/guides/optimistic-updates)
// A atualização ocorre antes da requisição, ou seja, o estado do cache é atualizado antes da requisição. Caso a requisição falhe, o estado do cache é atualizado para o estado anterior. Caso a requisição seja bem sucedida, o estado do cache é atualizado para o estado atualizado.

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TodoService.createTodo,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['todoList'] })

      const previousTodos = queryClient.getQueryData<Task[]>(['todoList'])

      queryClient.setQueryData<Omit<Task, 'id'>[]>(['todoList'], (tasks) => {
        if (tasks) {
          return [...tasks, newTask]
        } else {
          return [newTask]
        }
      })

      return { previousTodos }
    },

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['todoList'], context?.previousTodos)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todoList'] }) // Invalida a query para fazer a requisição novamente trazendo os dados que são gerados no back-end, como, por exemplo id e data de criação. Caso não seja invalidada, o id e a data de criação não serão atualizados no front-end. 
    }
  })
}

// Updates from Mutation Responses: (https://tanstack.com/query/v4/docs/react/guides/updates-from-mutation-responses)
// A atualização ocorre apenas após o sucesso da requisição, ou seja, o estado do cache é atualizado apenas após o sucesso da requisição

/* export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TodoService.createTodo,
    onSuccess: (task) => {
      queryClient.setQueryData<Task[]>(['todoList'], (oldTask) => {
        if (oldTask) {
          return [...oldTask, task]
        } else {
          return [task]
        }
      })
    },
  })
} */

/* // Com o código abaixo, é necessário invalidar a query para fazer a requisição novamente, pois o react-query não atualiza o estado do cache */

// export function useCreateTodo() {
//   const queryClient = useQueryClient()

//   return useMutation(
//     async ({ todo }: { todo: Task }) => TodoService.createTodo({ todo }),
//     {
//       onSuccess: (/* todo: Task */) => {
//         // console.log('todo', todo)
//         // queryClient.invalidateQueries(['todoList'])
//         queryClient.setQueryData(['todoList'], (todos: Task[]) => [...todos, todo])
//       },
//     }
//   )
// }