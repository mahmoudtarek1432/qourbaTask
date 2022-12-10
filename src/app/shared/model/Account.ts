export interface Account{
  id?: number,
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  gender?:string
  image?: string
}

export interface AuthToken{
  token: string | null
  isActive: boolean
}
