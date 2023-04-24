import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '../lib/getQueryclient'
import { getTodoList } from '@/services/todo'
import { TodoList } from './components/TodoList'

export default async function HydratedTodos() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['todoList'], getTodoList)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <TodoList />
    </Hydrate>
  )
}
