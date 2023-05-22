import React, { Suspense } from 'react'
import { Header } from '../components/Header'
import { WrapperTodoForm } from '../components/WrapperTodoForm'
import HydratedTodos from '../hydratedTodos'
import { TodoList } from '../components/TodoList'
import Link from 'next/link'

export default function Todos() {
  return (
    <>
      <Header />
      <Link href="/">Página inicial</Link>
      <main>
        <WrapperTodoForm />

        <Suspense fallback={<div>Loading...</div>}>
          {/* @ts-expect-error Server Component */}
          <HydratedTodos>
            <TodoList />
          </HydratedTodos>
        </Suspense>
      </main>
    </>
  )
}
