'use client'

import { useRemoveTodo } from "@/hooks/useRemoveTodo"
import { Task } from "@/types/task"


type TodoItemProps = {
  item: Task
}

export function TodoItem({ item }: TodoItemProps) {
  const { mutateAsync: removeTodo } = useRemoveTodo()

  function handleRemove() {
    if (item?.id) {
      removeTodo({ id: item?.id })
    }
  }

  return (
    <>
      <tr>
        <td className="text-center">{item?.id}</td>
        <td className="text-center">{item.description}</td>
        <td className="text-center">
          <button
            onClick={handleRemove}
            className="p-2 bg-purple-700 rounded-lg text-white hover:opacity-75">
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}
