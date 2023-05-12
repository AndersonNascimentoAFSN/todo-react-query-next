'use client'

import { useTodoList } from "@/hooks/useTodoList";

export function Header() {
  const { data: todos } = useTodoList();

  const taskCompleted = todos?.filter((todo) => todo.isCompleted).length

  return (
    <header className="w-screen bg-fuchsia-800 p-10">
      <h1 className="m-auto text-white text-3xl">Lista de Tarefas</h1>
      <h3 className="m-auto text-white text-xl">Organize suas tarefas de forma simples e prática</h3>
      <span className="text-white mr-3">Quantidade de tarefas completas:</span>
      <span className="text-white">{taskCompleted}</span>
    </header>
  )
}
