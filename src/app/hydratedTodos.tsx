import { ReactNode } from 'react'

import { dehydrate, Hydrate } from '@tanstack/react-query'

import getQueryClient from '../lib/getQueryclient'
import { getTodoList } from '@/services/todo'

// import { TodoList } from './components/TodoList'

type HydratedTodosProps = {
  children: ReactNode
}

export default async function HydratedTodos({ children }: HydratedTodosProps) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['todoList'], getTodoList)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      {children}
    </Hydrate>
  )
}
