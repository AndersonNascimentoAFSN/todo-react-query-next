import { FormProvider, useForm } from "react-hook-form";

export function WrapperUseForm(props: any) {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      {props.children}
    </FormProvider>
  );
};