import request from 'superagent'

const rootUrl = '/api/v1'

export function getCrypto(): Promise<string[]> {
  return request.get(rootUrl + '/cryptos').then((res) => {
    return res.body.fruits
  })
}
