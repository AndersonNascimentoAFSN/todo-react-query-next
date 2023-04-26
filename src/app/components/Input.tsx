'use client'

import { InputHTMLAttributes, ReactNode } from "react"
import { BiUser } from 'react-icons/bi'
import { InputLabel } from "./InputLabel";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: boolean;
  label?: string
  id: string
  children: ReactNode
}

export function Input({ leftIcon = false, label, id, children, ...rest }: InputProps) {
  return (
    <div className="flex flex-col w-full">

      {/* {label && (
        <InputLabel id={id}>{label}</InputLabel>
      )} */}
      {children}

      <input type="text" id={id} {...rest} />

      {leftIcon && (
        <div>
          <BiUser />
        </div>
      )}
    </div>
  )
}
