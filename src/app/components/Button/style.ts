import { VariantButtonProps } from './type'

export const BASE_BUTTON_CLASSES =
'py-3.5 px-8 rounded-md border-2 group flex gap-3 justify-center items-center';

export const getVariantClasses = (variant: VariantButtonProps) => {
  switch (variant) {
    case 'primary': {
      return 'bg-green text-white hover:bg-green-light border-none';
    }
    case 'secondary': {
      return 'border-green-light text-green-light font-bold bg-transparent hover:bg-green-light hover:text-white';
    }
    case 'tertiary': {
      return 'bg-gray3 text-white hover:bg-gray4 border-none';
    }
  }
}

