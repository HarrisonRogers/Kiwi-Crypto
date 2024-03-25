export interface Cryptos {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: Date
  tags: Tag[]
  max_supply: number | null
  circulating_supply: number | number
  total_supply: number
  is_active: number
  infinite_supply: boolean
  platform: null
  cmc_rank: number | null
  is_fiat: number
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
  tvl_ratio: null
  last_updated: Date
  quote: Quote
}

export interface Quote {
  '2802': The2802
}

export interface The2802 {
  price: number | null
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number | null
  market_cap_dominance: number
  fully_diluted_market_cap: number
  tvl: null
  last_updated: Date
}

export interface Tag {
  slug: string
  name: string
  category: Category
}

export enum Category {
  Algorithm = 'ALGORITHM',
  Category = 'CATEGORY',
  Industry = 'INDUSTRY',
  Others = 'OTHERS',
  Platform = 'PLATFORM',
}
