import request from 'superagent'

export async function getCryptos() {
  const response = await request.get('/api/v1/cryptos')
  return response.body
}
