'use client'

import { useCallback } from 'react'

import { useTodoList } from "@/hooks/useTodoList"
import { TodoItem } from "./TodoItem"
import { useRemoveTodo } from "@/hooks/useRemoveTodo"
import { useCompleteTodo } from "@/hooks/useCompleteTodo"

import { Task } from "@/types/task"

export function TodoList() {
  const { data: todos, isLoading: isLoadingTodo } = useTodoList() // isLoadingTodo não tem funcionalidade, visto que os dados não são consultados no lado do cliente
  const { mutateAsync: removeTodo } = useRemoveTodo()
  const { mutateAsync: completeTodo } = useCompleteTodo()

  const handleRemoveTask = useCallback((id: string) => {
    if (id) {
      removeTodo({ id: id })
    }
  }, [removeTodo])

  const handleCompleteTask = useCallback((item: Task) => {
    if (item) {
      completeTodo({ isCompleted: !item.isCompleted, id: item.id })
    }
  }, [completeTodo])

  return (
    <div className="w-screen flex items-center justify-center">
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Complete</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onRemoveTask={handleRemoveTask}
              onCompleteTask={handleCompleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}