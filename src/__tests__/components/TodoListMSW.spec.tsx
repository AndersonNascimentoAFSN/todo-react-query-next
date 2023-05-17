import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { renderWithClient } from "@/utils/utils"

import { TodoList } from "@/app/components/TodoList"

describe('<TodoList />', () => {

  it('should be able to render thead correctly', async () => {
    renderWithClient(<TodoList />)

    const thIdElement = screen.getByRole('columnheader', { name: /id/i })
    const thDescriptionElement = screen.getByRole('columnheader', { name: /description/i })
    const thCompleteElement = screen.getByRole('columnheader', { name: /complete/i })
    const thDeleteElement = screen.getByRole('columnheader', { name: /delete/i })

    expect(thIdElement).toBeVisible()
    expect(thDescriptionElement).toBeVisible()
    expect(thCompleteElement).toBeVisible()
    expect(thDeleteElement).toBeVisible()
  })

  it('should be render todo list with three tasks', async () => {
    renderWithClient(<TodoList />)

    await waitFor(async () => {
      const buttonsElement = screen.getAllByRole('button', { name: /delete/i })
      const descriptionsElement = screen.queryAllByText(/task/i)

      buttonsElement.forEach((button) => {
        expect(button).toBeVisible()
      })

      descriptionsElement.forEach((descriptionElement) => {
        expect(descriptionElement).toBeVisible()
      })

      expect(descriptionsElement).toHaveLength(3)
      expect(buttonsElement).toHaveLength(3)
    })
  })

  it('should be able to delete task the list with three tasks', async () => {
    renderWithClient(<TodoList />)

    await waitFor(async () => {
      const buttonsElement = screen.getAllByRole('button', { name: /delete/i })
      const descriptionElement = screen.queryByText(/task 1/i)

      expect(descriptionElement).toBeVisible()
      expect(buttonsElement).toHaveLength(3)

      await userEvent.click(buttonsElement[0])
    })

    await waitFor(() => {
      const buttonsElement = screen.getAllByRole('button', { name: /delete/i })
      const descriptionElement = screen.queryByText(/task 1/i)

      expect(descriptionElement).not.toBeInTheDocument()
      expect(buttonsElement).toHaveLength(2)
    })

  })

  it('should be able change the task for completed and return for not completed', async () => {
    renderWithClient(<TodoList />)
    const inputElement = await screen.findAllByRole('checkbox', { name: /isCompleteCheckBox/i })

    expect(inputElement[0]).not.toBeChecked()

    await userEvent.click(inputElement[0])

    expect(inputElement[0]).toBeChecked()

    await userEvent.click(inputElement[0])

    expect(inputElement[0]).not.toBeChecked()
  })
})
