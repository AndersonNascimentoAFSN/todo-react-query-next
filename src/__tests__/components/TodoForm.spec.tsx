import { TodoForm } from "@/app/components/TodoForm"
import { render, screen, logRoles, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe('<TodoForm>', () => {
  const handleSubmitForm = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })


  it('should be able to render the TodoForm correctly', () => {
    render(<TodoForm onSubmitAddTodo={handleSubmitForm} />)

    const inputElement = screen.getByRole('textbox', { name: /todo.description/i })
    const buttonElement = screen.getByRole('button', { name: /adicionar/i })

    expect(inputElement).toBeVisible()
    expect(buttonElement).toBeVisible()
  })

  it('should be able handleSubmitForm has called if input has value', async () => {
    render(<TodoForm onSubmitAddTodo={handleSubmitForm} />)

    const inputValue = 'Task1' // TODO: task faker

    const inputElement = screen.getByRole('textbox', { name: /todo.description/i })
    const buttonElement = screen.getByRole('button', { name: /adicionar/i })

    await userEvent.type(inputElement, inputValue)
    await userEvent.click(buttonElement)

    await waitFor(() => {
      expect(handleSubmitForm).toHaveBeenCalled()
      expect(handleSubmitForm).toHaveBeenCalledTimes(1)
      expect(handleSubmitForm).toHaveBeenCalledWith({
        todo: {
          description: inputValue
        }
      }, expect.anything())
    })
  })

  it('should be able handleSubmitForm no has called if input has empty', async () => {
    render(<TodoForm onSubmitAddTodo={handleSubmitForm} />)

    const buttonElement = screen.getByRole('button', { name: /adicionar/i })

    await userEvent.click(buttonElement)

    await waitFor(() => {
      expect(handleSubmitForm).not.toHaveBeenCalled()
    })
  })

  it('should be able show error message when fields was empty', async () => {
    render(<TodoForm onSubmitAddTodo={handleSubmitForm} />)

    const buttonElement = screen.getByRole('button', { name: /adicionar/i })

    await userEvent.click(buttonElement)

    await waitFor(() => {
      const errorMessage = screen.getByText('É necessário informar uma descrição para a tarefa.')
      expect(errorMessage).toBeVisible()
    })
  })

  it('should be able not show error message when fields was not empty', async () => {
    render(<TodoForm onSubmitAddTodo={handleSubmitForm} />)
    const inputValue = 'Task2'
    const buttonElement = screen.getByRole('button', { name: /adicionar/i })
    const inputElement = screen.getByRole('textbox', { name: /todo.description/i })

    await userEvent.type(inputElement, inputValue)
    await userEvent.click(buttonElement)

    await waitFor(() => {
      const errorMessage = screen.queryByText('É necessário informar uma descrição para a tarefa.')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })
})