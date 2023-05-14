import { Suspense } from "react";
import { Header } from "./components/Header";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import HydratedTodos from "./hydratedTodos";

export default function Home() {

  return (
    <main>
      <Header />

      <TodoForm />

      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <HydratedTodos>
          <TodoList />
        </HydratedTodos>
      </Suspense>

    </main>
  )
}
