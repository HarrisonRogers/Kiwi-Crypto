import connection from './connection.ts'
// import { Fruit } from '../../models/crypto.ts'

// export async function getAllFruits(db = connection): Promise<Fruit[]> {
//   return db('fruit').select()
// }

const db = connection

export async function getAllCryptosInPortfolio() {
  return db('portfolios').select(
    'coin_name as name',
    'coin_id as id',
    'price',
    'percent_change_1h',
    'percent_change_24h',
    'percent_change_7d',
    'market_cap',
  )
}

export async function getUserAuthId(id: string) {
  return db('users').where({ authO_id: id }).first()
}
