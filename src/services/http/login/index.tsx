import axios from 'axios'

interface LoginProps {
  login: string,
  password: string
}

interface LoginResultProps {
  status: number,
  message: string
}

export const UserService = {
  login: async function ({
    login,
    password
  }: LoginProps): Promise<LoginResultProps | undefined> {
    try {
      console.log('UserService.login', login, password)

      return {
        status: 200,
        message: 'success'
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`)
      }
    }

  }
}