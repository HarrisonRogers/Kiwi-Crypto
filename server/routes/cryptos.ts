import express from 'express'
import request from 'superagent'
import 'dotenv/config'

const router = express.Router()
const apiKey = process.env.CRYPTO_API_KEY

router.get('/', async (req, res, next) => {
  try {
    const response = await request
      .get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .set('X-CMC_PRO_API_KEY', apiKey!)
      .query({ id: '1,1027' })

    res.json(response.body.data)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
