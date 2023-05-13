'use client'

import { useCreateTodo } from "@/hooks/useCreateTodo"
import { useState } from "react"
import { Button } from "./Button"

export function Todo() {
  const [task, setTask] = useState<string>('')
  const { mutateAsync } = useCreateTodo()

  function handleAddTodo() {
    mutateAsync({ todo: { description: task } })
    setTask('')
  }

  return (
    <form className="w-screen p-10 flex gap-4">
      <input
        type="text"
        placeholder="adicione uma tarefa a lista"
        className="w-full max-w-lg p-2 border-2 border-gray-300 placeholder:text-purple-500 outline-none ring-1 focus:ring focus:ring-purple-300 text-purple-800"
        onChange={(event) => setTask(event.target.value)} value={task}
      />
      <Button
        onClick={handleAddTodo}
      >
        Adicionar
      </Button>
    </form>
  )
}