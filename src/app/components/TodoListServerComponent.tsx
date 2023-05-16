import { getTodoList } from '@/services/todo'
import React from 'react'

export default async function TodoListServerComponent() {
  const todo = await getTodoList()

  return (
    <div>
      <h1>Todo List</h1>
      {todo?.map((item) => (
        <div key={item.id}>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
