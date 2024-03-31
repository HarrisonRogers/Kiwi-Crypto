import request from 'superagent'
import { Portfolio } from '../../models/dbModels'

const rootURL = '/api/v1/portfolios'

export async function getCryptos() {
  const response = await request.get(rootURL)
  return response.body
}

export async function getCryptosInPortfolio() {
  const response = await request.get(`${rootURL}/portfolio`)
  return response.body
}

export async function addCryptoToPortfolio(crypto: Portfolio) {
  const response = await request.post(`${rootURL}/portfolio`).send(crypto)
  return response.body
}
