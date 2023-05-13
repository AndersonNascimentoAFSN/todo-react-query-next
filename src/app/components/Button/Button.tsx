import { useMemo } from "react"

import { BASE_BUTTON_CLASSES, getVariantClasses } from "./style";
import { ButtonProps } from "./type";

export function Button({ children, variant = "primary", ...rest }: ButtonProps) {
  const computedClasses = useMemo(() => {
    const variantClass = getVariantClasses(variant);

    return [variantClass].join(' ');
  }, [variant]);

  return (
    <button
      {...rest}
      className={`${BASE_BUTTON_CLASSES} ${computedClasses} ${rest?.className}`}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'