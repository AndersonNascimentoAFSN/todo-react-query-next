import { ReactNode } from "react"

type InputLabelProps = {
  id: string,
  children: ReactNode
}

export function InputLabel({ id, children }: InputLabelProps) {
  return (
    <label htmlFor={id}>{children}</label>
  )
}