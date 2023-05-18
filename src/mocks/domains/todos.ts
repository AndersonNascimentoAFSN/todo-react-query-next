import { rest } from "msw"
import { Task } from "../types"
import { todoData } from "../data/todo-data"

export const todoHandlers = [
  rest.get('*/todo', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Task[]>(todoData)
    )
  }),

  rest.post('*/todo', async (req, res, ctx) => {
    const { description, isCompleted } = await req.json()
    
    const id = Number(todoData[todoData.length - 1].id) + 1

    const todo: Task = {
      id: id.toString(),
      description,
      isCompleted
    }


    todoData.push(todo)
    return res(
      ctx.status(201),
      ctx.json<Task>(todo)
    )
  }),

  rest.delete('*/todo/:id', async (req, res, ctx) => {
    const { id } = req.params;

    if (id) {
      const todoIndex = todoData.findIndex(todo => todo?.id === id)
      if (todoIndex !== -1) {
        todoData.splice(todoIndex, 1)
        return res(ctx.json({}), ctx.status(200))
      } else {
        return res(ctx.json({}), ctx.status(404))
      }
    }

    return res(ctx.json({}), ctx.status(404))
  }),

  rest.patch('*/todo/:id', async (req, res, ctx) => {
    const { id } = req.params;

    const { isCompleted } = await req.json<{ isCompleted: boolean }>()

    if (id) {
      const todoIndex = todoData.findIndex(todo => todo.id === id.toString())

      if (todoIndex !== -1) {
        todoData[todoIndex].isCompleted = isCompleted
        return res(
          ctx.json<Task>(todoData[todoIndex]),
          ctx.status(200),
        )
      } else {
        return res(ctx.json({}), ctx.status(404))
      }
    }
    return res(ctx.json({}), ctx.status(404))
  }),
]