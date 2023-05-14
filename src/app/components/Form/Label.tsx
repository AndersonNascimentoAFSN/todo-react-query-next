import { LabelHTMLAttributes } from "react";

const BASE_LABEL_CLASSES = '';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`${BASE_LABEL_CLASSES} ${props?.className}`}
    />
  )
}