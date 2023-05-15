'use client'

import { Task } from "@/types/task"

type TodoItemProps = {
  item: Task
  onCompleteTask: (item: Task) => void
  onRemoveTask: (id: string) => void
}

export function TodoItem({ item, onCompleteTask, onRemoveTask }: TodoItemProps) {
  return (
    <>
      <tr>
        <td className="text-center">{item.id}</td>
        <td className="text-center">{item.description}</td>
        <td className="text-center">
          <input
            type="checkbox"
            className="p-8 cursor-pointer w-5 h-5"
            checked={item.isCompleted}
            onChange={() => onCompleteTask(item)}
            aria-label="isCompleteCheckBox"
          />
        </td>
        <td className="text-center">
          <button
            onClick={() => onRemoveTask(item.id)}
            className="p-2 bg-purple-700 rounded-lg text-white hover:opacity-75">
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}
