import { Suspense } from "react";

import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import HydratedTodos from "./hydratedTodos";
import { WrapperTodoForm } from "./components/WrapperTodoForm";

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <WrapperTodoForm />

        <Suspense fallback={<div>Loading...</div>}>
          {/* @ts-expect-error Server Component */}
          <HydratedTodos>
            <TodoList />
          </HydratedTodos>
        </Suspense>
      </main>
    </div>
  )
}
