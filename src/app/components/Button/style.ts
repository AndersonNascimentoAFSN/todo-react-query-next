import { VariantButtonProps } from './type'

export const BASE_BUTTON_CLASSES =
  'p-2';

export const getVariantClasses = (variant: VariantButtonProps) => {
  switch (variant) {
    case 'primary': {
      return 'bg-purple-700 rounded-lg text-white hover:opacity-75';
    }
    case 'secondary': {
      return '';
    }
    case 'tertiary': {
      return '';
    }
  }
}

