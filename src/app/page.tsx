import { Header } from "./components/Header";
import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";

export default function Home() {

  return (
    <main>
      <Header />
      <Todo />

      <TodoList />
    </main>
  )
}
