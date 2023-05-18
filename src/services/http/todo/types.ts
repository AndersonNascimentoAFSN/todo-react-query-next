import { Task } from "@/types/task"

export type CreateTodoProps = Omit<Task, 'id'>

export type RemoveTodoProps = Pick<Task, 'id'>

export type GetTodoByIdProps = Pick<Task, 'id'>

export type CompletedTodoProps = Omit<Task, 'description'>