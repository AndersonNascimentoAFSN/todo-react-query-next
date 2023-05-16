import { renderHook, render, screen, logRoles, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { WrapperReactQuery } from "@/utils/WrapperReactQuery"
import { TodoList } from "@/app/components/TodoList"

import * as useTodoList from '../../hooks/useTodoList'
import * as useRemoveTodo from "@/hooks/useRemoveTodo"
import * as useCompleteTodo from "@/hooks/useCompleteTodo"

jest.mock('../../hooks/useTodoList', () => ({
  useTodoList: jest.fn(),
}))

jest.mock('../../hooks/useRemoveTodo', () => ({
  useRemoveTodo: jest.fn(),
}))

jest.mock('../../hooks/useCompleteTodo', () => ({
  useCompleteTodo: jest.fn()
}))

describe('<TodoList />', () => {
  const todos = [
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
  ]

  beforeEach(() => {
    jest.spyOn(useTodoList, 'useTodoList').mockImplementation(() => ({
      data: todos,
      isLoading: true,
      error: false,
      isError: false,
      isFetching: false,
      isSuccess: false,
      status: 'success',
    }))
    jest.spyOn(useRemoveTodo, 'useRemoveTodo').mockImplementation(() => ({
      mutateAsync: jest.fn(),
    }))
    jest.spyOn(useCompleteTodo, 'useCompleteTodo').mockImplementation(() => ({
      mutateAsync: jest.fn(),
    }))
  })

  // jest.spyOn(ReactQuery, 'useQuery').mockImplementation(
  //   jest.fn().mockReturnValue({ data: todos, /* isLoading: false, isSuccess: true */ }))

  it('should be able to render correctly', () => {
    render(
      <WrapperReactQuery>
        <TodoList />
      </WrapperReactQuery>
    )

    const thIdElement = screen.getByRole('columnheader', { name: /id/i })
    const thDescriptionElement = screen.getByRole('columnheader', { name: /description/i })
    const thCompleteElement = screen.getByRole('columnheader', { name: /complete/i })
    const thDeleteElement = screen.getByRole('columnheader', { name: /delete/i })

    expect(thIdElement).toBeVisible()
    expect(thDescriptionElement).toBeVisible()
    expect(thCompleteElement).toBeVisible()
    expect(thDeleteElement).toBeVisible()
  })

  it('should be able to render items in the list correctly', async () => {
    const { container } = render(
      <WrapperReactQuery>
        <TodoList />
      </WrapperReactQuery>
    )

    await waitFor(() => {
      const descriptionElement = screen.queryByText(/task 1/i)
      expect(descriptionElement).toBeVisible()
    })

    // logRoles(container)
  })

  it('should be able to render items in the list correctly', async () => {
    render(
      <WrapperReactQuery>
        <TodoList />
      </WrapperReactQuery>
    )

    await waitFor(async () => {
      const buttonElement = screen.getAllByRole('button', { name: /delete/i })
      expect(buttonElement[0]).toBeVisible()
      await userEvent.click(buttonElement[0])
    })

    await waitFor(() => {
      const descriptionElement = screen.queryAllByText(/task 1/i)
      expect(descriptionElement[0]).toBeVisible()
    })

  })
})
