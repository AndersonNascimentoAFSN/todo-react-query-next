export function handleSetColorByGender(gender: 'male' | 'female') {
  const genders = {
    male: 'text-green-500',
    female: 'text-pink-500'
  }

  return genders[gender]
}