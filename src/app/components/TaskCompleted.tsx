'use client'

import { useTodoList } from "@/hooks/useTodoList";

export function TaskCompleted() {
  const { data: todos } = useTodoList();

  const taskCompleted = todos?.filter((todo) => todo.isCompleted).length

  return (
    <>
      <span className="text-white mr-3">Quantidade de tarefas completas:</span>
      <span className="text-white">{taskCompleted}</span>
    </>
  )
}
