export interface User {
  id: number
  authO_id: string
}

export interface Portfolio {
  id: string
  authO_id: string | undefined
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

export interface Coin {
  id: number
  authO_id: string
  coin_id: number
  coin_name: string
  price: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
}

export interface Id {
  id: number
}

export interface DeleteParams {
  name: string
  price: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
}
