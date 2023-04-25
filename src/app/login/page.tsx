'use client'

import { useLogin } from '@/hooks/useLogin'

export default function Login() {
  const { handleSubmit, handleSubmitData, register } = useLogin()

  return (
    <main className='max-w-lg m-auto'>
      <h2 className='mb-4 mt-4 text-2xl font-bold'>Login</h2>

      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className='flex flex-col max-w-lg gap-4'
      >
        <input
          type="text"
          {...register('login')}
          placeholder='Informe seu login'
          autoComplete='off'
          className='w-full p-2 border-2 border-gray-500'
        />

        <input
          type="password"
          {...register('password')}
          placeholder='Informe sua senha'
          autoComplete='off'
          className='w-full p-2 border-2 border-gray-500'
        />

        <button
          type="submit"
          className='w-full bg-green-600 p-2 text-white text-lg'
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
