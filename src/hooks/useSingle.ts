import axios from "axios"

import { useEffect, useState } from "react"

type RandUser = {
  gender: 'male' | 'female'
  cell: string
  name: {
    first: string
  }
}

type RandUserData = {
  results: RandUser[]
}

export function useSingle() {
  const [randUser, setRandUser] = useState<RandUserData>()
  const [isLoadingRandUser, setIsLoadingRandUser] = useState<boolean>(false)

  async function handleFetch() {
    setIsLoadingRandUser(true)
    const response = await axios.get<RandUserData | undefined>('https://randomuser.me/api/?results=20')

    if (response.status === 200) {
      setRandUser(response.data)
    }

    setIsLoadingRandUser(false)
  }


  useEffect(() => {
    handleFetch()
  }, [])

  return {
    randUser,
    isLoadingRandUser,
  }
}