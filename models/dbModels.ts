export interface User {
  id: number
  authO_id: string
}

export interface Portfolio {
  id: number
  user_id: number
  coin_id: string
  coin_name: string
  amount: number
}
