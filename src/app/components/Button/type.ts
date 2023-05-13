import { ButtonHTMLAttributes, ReactNode } from "react"

export type VariantButtonProps = 'primary' | 'secondary' | 'tertiary'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: VariantButtonProps
}