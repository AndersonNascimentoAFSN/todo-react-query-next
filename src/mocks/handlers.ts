import { Task } from "./types"
import { rest } from "msw"

export const handlers = [
  rest.get('http://localhost:3333/todo', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Task[]>( [
        {
          id: '1',
          description: 'Task 1',
          isCompleted: false
        },
        {
          id: '2',
          description: 'Task 2',
          isCompleted: false
        },
        {
          id: '3',
          description: 'Task 3',
          isCompleted: false
        }
      ])
    )
  })
]