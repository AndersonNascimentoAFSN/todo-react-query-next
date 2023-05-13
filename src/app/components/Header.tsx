import { Suspense } from "react";
import { TaskCompleted } from "./TaskCompleted";
import HydratedTodos from "../hydratedTodos";

export function Header() {
  return (
    <header className="w-screen bg-gray1 p-10">
      <h1 className="m-auto text-white text-3xl">Lista de Tarefas</h1>
      <h3 className="m-auto text-white text-xl">Organize suas tarefas de forma simples e prática</h3>

      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <HydratedTodos>
          <TaskCompleted />
        </HydratedTodos>
      </Suspense>
    </header>
  )
}
