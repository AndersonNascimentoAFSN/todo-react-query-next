'use client'

import { useTodoList } from "@/hooks/useTodoList"
import { TodoItem } from "./TodoItem"


export function TodoList() {
  const { data: todos, isLoading: isLoadingTodo } = useTodoList()

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
            <TodoItem item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}