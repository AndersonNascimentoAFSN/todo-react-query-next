'use client'

import { useCompleteTodo } from "@/hooks/useCompleteTodo"
import { useRemoveTodo } from "@/hooks/useRemoveTodo"
import { Task } from "@/types/task"


type TodoItemProps = {
  item: Task
}

export function TodoItem({ item }: TodoItemProps) {
  const { mutateAsync: removeTodo } = useRemoveTodo()
  const { mutateAsync: completeTodo } = useCompleteTodo()

  function handleRemove() {
    if (item?.id) {
      removeTodo({ id: item?.id })
    }
  }

  function handleChecked() {
    if (item.id) {
      completeTodo({ isCompleted: !item.isCompleted, id: item.id })
    }
  }

  return (
    <>
      <tr>
        <td className="text-center">{item?.id}</td>
        <td className="text-center">{item.description}</td>
        <td className="text-center">
          <input type="checkbox" className="p-8 cursor-pointer w-5 h-5" checked={item.isCompleted} onChange={handleChecked} />
        </td>
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
