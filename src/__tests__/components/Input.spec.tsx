import { render, screen, logRoles, act, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Input } from '@/app/components/Form/Input'
import { WrapperUseForm } from "@/utils/WrapperUseForm"

describe('<Input />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be able to render the input correctly', () => {
    const { container } = render(
      <WrapperUseForm>
        <Input name="name" aria-label="name" />
      </WrapperUseForm>
    )

    const inputElement = screen.getByRole('textbox', { name: /name/i })

    expect(inputElement).toBeVisible()
    expect(container).toMatchSnapshot()
  })

  it('should be able to write in the input', async () => {
    render(
      <WrapperUseForm>
        <Input name="name" aria-label="name" />
      </WrapperUseForm>
    )

    const inputValue = 'John Doe'

    const inputElement = screen.getByRole('textbox', { name: /name/i })

    await act(async () => {
      await userEvent.type(inputElement, inputValue)
    })

    expect(inputElement).toHaveValue(inputValue)
  })
})