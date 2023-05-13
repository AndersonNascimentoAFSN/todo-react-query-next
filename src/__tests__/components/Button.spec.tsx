import { render, screen, logRoles, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Button } from '@/app/components/Button'

describe('<Button />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be able to render the button correctly', () => {
    render(<Button>Add</Button>)

    const buttonElement = screen.getByRole('button', { name: /add/i })

    expect(buttonElement).toBeVisible()
  })

  it('should be able to onClick has called', async () => {
    const handleAdd = jest.fn()

    const { container } = render(<Button onClick={handleAdd}>Add</Button>)

    const buttonElement = screen.getByRole('button', { name: /add/i })

    await act(async () => {
      await userEvent.click(buttonElement)
    })

    expect(handleAdd).toHaveBeenCalled()
    expect(handleAdd).toHaveBeenCalledTimes(1)

    expect(container).toMatchSnapshot()
  })

  it('should be able to onClick has called', async () => {
    render(<Button variant="primary">Add</Button>)

    const buttonElement = screen.getByRole('button', { name: /add/i })

  })
})