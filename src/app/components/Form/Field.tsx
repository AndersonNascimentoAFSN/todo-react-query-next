import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> { }

export function Field(props: FieldProps) {
  return (
    <div {...props} className="flex flex-1 flex-col gap-1" />
  )
}