// type User = {
//   id: number
//   email: string
//   name: string
//   address: string
// }

type ProfileProps = {
  name: string
  email: string
}

export function Profile({ name = '', email = '' }: ProfileProps) {
  return (
    <>
      <h2>{name}</h2>
      <p>{email}</p>
    </>
  )
}