import { useTodoList } from "@/hooks/useTodoList";
import { Header } from "./components/Header";
import { Todo } from "./components/Todo";
import { TodoList } from "./components/TodoList";

export default function Home() {
  const { data: todo } = useTodoList();

  return (
    <main>
      <Header status={todo?.length} />
      <Todo />

      <TodoList />
    </main>
  )
}
