import { useForm } from "react-hook-form"

import { UserService } from "@/services/http/login"

export function useLogin() {
  const { handleSubmit, register } = useForm()

  const handleSubmitData = async (data: any) => {
    await UserService.login({
      login: data.login,
      password: data.password
    })
  }

  return {
    handleSubmit,
    register,
    handleSubmitData
  }
}