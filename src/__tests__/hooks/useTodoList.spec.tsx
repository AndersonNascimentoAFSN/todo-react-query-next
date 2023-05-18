import { renderHook, waitFor } from '@testing-library/react'

import { useTodoList } from '@/hooks/useTodoList'
import { createWrapper } from '../../utils/utils'
import { todoData } from '@/mocks/data/todo-data'

describe('useTodoList', () => {
  it('should be isSuccess  return true', async () => {
    const { result } = renderHook(() => useTodoList(), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('should be return data todos', async () => {
    const { result } = renderHook(() => useTodoList(), { wrapper: createWrapper() })
    await waitFor(() => {
      expect(result.current.data).toEqual(todoData)
      expect(result.current.data).toHaveLength(3)
    })
  })
})
