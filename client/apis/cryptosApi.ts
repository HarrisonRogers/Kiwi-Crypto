import request from 'superagent'
import { Cryptos } from '../../models/crypto'

export async function getCryptos() {
  const response = await request.get('/api/v1/cryptos')
  return response.body
}
