import { Suspense } from "react";
import { Header } from "./components/Header";
import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";
import HydratedTodos from "./hydratedTodos";

export default function Home() {

  return (
    <main>
      <Header />

      <Todo />

      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <HydratedTodos>
          <TodoList />
        </HydratedTodos>
      </Suspense>

    </main>
  )
}
