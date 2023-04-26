import { InputHTMLAttributes, ReactNode, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function InputLSP({ name, type = 'text', ...rest }: InputProps) {
  return (
    <>
      <input type={type} name={name} {...rest} />
    </>
  )
}

type InputWithLabelProps = InputProps & {
  childre: ReactNode
}

export function InputWithLabel({ children, ...rest }: InputWithLabelProps) {
  const inputId = useId()

  return (
    <>
      <label htmlFor={inputId}>{children}</label>

      <InputLSP id={inputId} {...rest} />
    </>
  )
}
