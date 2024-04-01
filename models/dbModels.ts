export interface User {
  id: number
  authO_id: string
}

export interface Portfolio {
  id: string
  authO_id: string
  name: string
  price: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
}

export interface AuthOID {
  authO_id: string
}
