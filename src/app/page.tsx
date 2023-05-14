import { Suspense } from "react";
import { Header } from "./components/Header";
import { CreateTodoForm, TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import HydratedTodos from "./hydratedTodos";
import { useCreateTodo } from "@/hooks/useCreateTodo"

export default function Home() {

  function onSubmitAddTodo(todoData: CreateTodoForm) {
    // mutateAsync(todoData)
  }

  return (
    <main>
      <Header />

      <TodoForm onSubmitAddTodo={onSubmitAddTodo} />

      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <HydratedTodos>
          <TodoList />
        </HydratedTodos>
      </Suspense>

    </main>
  )
}
