import request from 'superagent'
import { Id, Portfolio } from '../../models/dbModels'

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

// export async function checkForCryptoInPortfolio(
//   token: string,
//   authO_id: string,
//   coin_id: string,
// ) {
//   const response = await request
//     .get(`${rootURL}/portfolio/${authO_id}/${coin_id}`)
//     .set('Authorization', `Bearer ${token}`)
//   return response.body
// }

export async function checkForCryptoInPortfolio(
  token: string,
  userId: string,
  coinId: string,
) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  })

  const response = await fetch(`${rootURL}/portfolio/check?coin_id=${coinId}`, {
    headers,
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data.isInPortfolio
}

export async function deleteCoinFromPortfolio(id: Id) {
  const response = await request.delete(`${rootURL}/${id.id}`)
  return response.body
}
