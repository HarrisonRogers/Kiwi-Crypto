import request from 'superagent'
import { Cryptos } from '../../models/crypto'

export async function getCryptos(): Promise<Cryptos[]> {
  const response = await request.get('/api/v1/cryptos')
  return response.body
}
