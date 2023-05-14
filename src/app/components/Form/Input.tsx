import { InputHTMLAttributes, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean
  name: string
};

const getIsErrorClasses = (isError: boolean) => {
  if (isError) {
    return 'border-2 border-red focus:border-red';
  }
}

const BASE_INPUT_CLASSES = 'w-full p-4 rounded-md bg-gray1 placeholder:text-gray5 text-gray6 outline-none focus:border-2 focus:border-green-light';

export const Input = (props: InputProps) => {
  const { isError = false, name = '', ...rest } = props;

  const { register } = useFormContext()

  const computedClasses = useMemo(() => {
    const isErrorClass = getIsErrorClasses(isError);

    return [isErrorClass].join(' ');
  }, [isError]);

  return (
    <input
      {...rest}
      autoComplete="off"
      className={`${BASE_INPUT_CLASSES} ${computedClasses} ${rest?.className}`}
      {...register(name)}
    />
  )
}

Input.displayName = 'Form.Input'
