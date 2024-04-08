import connection from './connection.ts'

/**
 * Adds a cryptocurrency to the user's portfolio.
 *
 * @param {Object} crypto - The cryptocurrency data to insert.
 * @param {string} crypto.authO_id - The Auth0 identifier for the user.
 * @param {string} crypto.coin_id - The unique identifier for the cryptocurrency.
 * @param {string} crypto.coin_name - The name of the cryptocurrency.
 * @param {number} crypto.price - The current price of the cryptocurrency.
 * @param {number} crypto.percent_change_1h - The percent change in price in the last hour.
 * @param {number} crypto.percent_change_24h - The percent change in price in the last 24 hours.
 * @param {number} crypto.percent_change_7d - The percent change in price over the last 7 days.
 * @param {number} crypto.market_cap - The market capitalization of the cryptocurrency.
 * @returns A promise that resolves with the result of the insert operation.
 */

const db = connection

export async function getAllCryptosInPortfolio() {
  return db('portfolios').select(
    'authO_id',
    'coin_name as name',
    'coin_id as id',
    'price',
    'percent_change_1h',
    'percent_change_24h',
    'percent_change_7d',
    'market_cap',
  )
}

export async function checkPortfolioForCrypto(
  authO_id: string,
  coin_id: string,
) {
  const numberOfCryptos = await db('portfolios')
    .where({ authO_id, coin_id })
    .count({ count: '*' })
    .first()
  const coinExists = numberOfCryptos?.count !== 0
  return coinExists
}

export async function getUserAuthId(id: string) {
  return db('portfolios').where({ authO_id: id }).first()
}

export async function addCryptoToPortfolioWithPost(
  authO_id: string,
  coin_id: number,
  coin_name: string,
  price: number,
  percent_change_1h: number,
  percent_change_24h: number,
  percent_change_7d: number,
  market_cap: number,
) {
  return db('portfolios').insert({
    authO_id,
    coin_id,
    coin_name,
    price,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    market_cap,
  })
}

export async function deleteCoinFromPortfolioById(id: number) {
  const result = db('portfolios').select().where('id', id).del()
  return result
}
