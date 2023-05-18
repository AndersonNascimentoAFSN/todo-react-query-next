import { act, renderHook, waitFor } from '@testing-library/react'

import { createWrapper } from '../../utils/utils'
import { todoData } from '@/mocks/data/todo-data'
import { useCreateTodo } from '@/hooks/useCreateTodo'

describe('useTodoList', () => {
  it('should be when create task return task created', async () => {
    const { result } = renderHook(() => useCreateTodo(), { wrapper: createWrapper() })

    await act(async () => {
      const todoCreated = await result.current.mutateAsync({
        description: todoData[0].description,
        isCompleted: false
      })
      expect(todoCreated).toStrictEqual({ description: "Task 1", isCompleted: false })
    })
  })
})