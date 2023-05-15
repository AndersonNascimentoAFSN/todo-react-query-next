import { renderHook, render, screen, logRoles } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { TodoItem } from "@/app/components/TodoItem"
import { WrapperReactQuery } from "@/utils/WrapperReactQuery"

describe('TodoItem', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  const onCompleteTask = jest.fn()
  const onRemoveTask = jest.fn()

  it('should render with style css', () => {
    const item = { id: '1', description: 'Python', isCompleted: false }

    render(
      <WrapperReactQuery>
        <table>
          <tbody>
            <TodoItem item={item} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />
          </tbody>
        </table>
      </WrapperReactQuery>
    )

    const buttonElement = screen.getByRole('button', { name: /delete/i })

    expect(buttonElement).toHaveClass('p-2 bg-purple-700 rounded-lg text-white hover:opacity-75')
  })

  it('should render correctly', () => {
    // const { result } = renderHook(() => TodoItem)
    const item = { id: '1', description: 'Python', isCompleted: false }

    const { container } = render(
      <WrapperReactQuery>
        <table>
          <tbody>
            <TodoItem item={item} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />
          </tbody>
        </table>
      </WrapperReactQuery>
    )

    const idElement = screen.getByText(/1/i)
    const descriptionElement = screen.getByText(/python/i)
    const buttonElement = screen.getByRole('button', { name: /delete/i })
    const inputElement = screen.getByRole('checkbox', { name: /isCompleteCheckBox/i })

    expect(idElement).toBeVisible()
    expect(descriptionElement).toBeVisible()
    expect(buttonElement).toBeVisible()
    expect(inputElement).toBeVisible()

    logRoles(container)
  })

  it('should to able to onRemoveTask has called', async () => {
    const item = { id: '1', description: 'Python', isCompleted: false }

    render(
      <WrapperReactQuery>
        <table>
          <tbody>
            <TodoItem item={item} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />
          </tbody>
        </table>
      </WrapperReactQuery>
    )

    const buttonElement = screen.getByRole('button', { name: /delete/i })

    await userEvent.click(buttonElement)

    expect(onRemoveTask).toHaveBeenCalled()
    expect(onRemoveTask).toHaveBeenCalledTimes(1)
    expect(onRemoveTask).toHaveBeenCalledWith('1')
  })

  it('should to able to onCompleteTask has called', async () => {
    const item = { id: '1', description: 'Python', isCompleted: false }

    render(
      <WrapperReactQuery>
        <table>
          <tbody>
            <TodoItem item={item} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />
          </tbody>
        </table>
      </WrapperReactQuery>
    )

    const inputElement = screen.getByRole('checkbox', { name: /isCompleteCheckBox/i })

    await userEvent.click(inputElement)

    expect(onCompleteTask).toHaveBeenCalled()
    expect(onCompleteTask).toHaveBeenCalledTimes(1)
    expect(onCompleteTask).toHaveBeenCalledWith(item)
  })

  it('should to able input checked if isCompleted is true', async () => {
    const item = { id: '1', description: 'Python', isCompleted: true }

    render(
      <WrapperReactQuery>
        <table>
          <tbody>
            <TodoItem item={item} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />
          </tbody>
        </table>
      </WrapperReactQuery>
    )

    const inputElement = screen.getByRole('checkbox', { name: /isCompleteCheckBox/i })

    expect(inputElement).toBeChecked()
  })

  it('should to able input not checked if isCompleted is false', async () => {
    const item = { id: '1', description: 'Python', isCompleted: false }

    render(
      <WrapperReactQuery>
        <table>
          <tbody>
            <TodoItem item={item} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} />
          </tbody>
        </table>
      </WrapperReactQuery>
    )

    const inputElement = screen.getByRole('checkbox', { name: /isCompleteCheckBox/i })

    expect(inputElement).not.toBeChecked()
  })
})