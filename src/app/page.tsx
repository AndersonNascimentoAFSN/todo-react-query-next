import { Suspense } from "react";

import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import HydratedTodos from "./hydratedTodos";
import { WrapperTodoForm } from "./components/WrapperTodoForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/todos">Lista de tarefas</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}
