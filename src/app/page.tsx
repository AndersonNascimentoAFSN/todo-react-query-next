import { Header } from "./components/Header";
import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";
import HydratedTodos from "./hydratedTodos";

export default function Home() {

  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <HydratedTodos>
        <Header />
      </HydratedTodos>

      <Todo />

      {/* @ts-expect-error Server Component */}
      <HydratedTodos>
        <TodoList />
      </HydratedTodos>

    </main>
  )
}
