import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { WrapperReactQuery } from "@/utils/WrapperReactQuery"
import { renderWithClient } from "@/utils/utils"

import { TodoList } from "@/app/components/TodoList"


describe('<TodoList />', () => {

  it('should be able to render correctly', () => {
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

  it('should be able to render items in the list correctly', async () => {
    renderWithClient(<TodoList />)


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

  it('should be able change isCompleted', async () => {
    renderWithClient(<TodoList />)


    // await waitFor(() => {
    // })
    const inputElement = await screen.findAllByRole('checkbox', { name: /isCompleteCheckBox/i })
    expect(inputElement[0]).toBeVisible()
    await userEvent.click(inputElement[0])

    // await waitFor(() => {
    //   const descriptionElement = screen.queryAllByText(/task 1/i)
    //   expect(descriptionElement[0]).toBeVisible()
    // })

  })
})
