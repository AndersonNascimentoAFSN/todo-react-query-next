'use client'

import { useSingle } from "@/hooks/useSingle"
import { handleSetColorByGender } from "@/utils/handleSetColorByGender"
import { useCallback } from "react"

export default function Single() {
  const { randUser, isLoadingRandUser } = useSingle()

  const getColor = useCallback((gender: 'male' | 'female') => {
    return handleSetColorByGender(gender)
  }, [])

  return (
    <div>
      <h2>Single Responsibility Principle</h2>

      {randUser?.results?.map((item) => (
        <div key={item.cell}>
          <p className={getColor(item.gender)}>
            {item.name.first}
          </p>
        </div>
      ))}

      {isLoadingRandUser && <div>Loading...</div>}
    </div>
  )
}

Single.displayName = 'Single'