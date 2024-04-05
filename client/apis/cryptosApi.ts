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

export async function addCryptoToPortfolio({
  crypto,
  token,
}: {
  crypto: Portfolio
  token: string
}) {
  const response = await request
    .post(`${rootURL}/portfolio`)
    .send(crypto)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
