import TodoListServerComponent from "@/app/components/TodoListServerComponent"
import { renderHook, render, screen, logRoles, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"


describe('<TodoListServerComponent />', () => {
  it('should render', async () => {

    render(await TodoListServerComponent())

    expect(await screen.findByText('Task 1')).toBeInTheDocument()
  })
})

// /* {/* @ts-expect-error Server Component */} */