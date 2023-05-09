import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types/task";

import { TodoService } from "../services/http/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TodoService.createTodo,
    onMutate: async () => {
      const previousTodos = queryClient.getQueryData<Task[]>(['todoList'])
      return { previousTodos }
    },

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(['todoList'], context?.previousTodos)
    },

    onSuccess: (task: Task) => {
      queryClient.setQueryData<Task[]>(['todoList'], (todos) => {
        if (!todos) return

        return [...todos, task]
      })
    },
  })
}

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