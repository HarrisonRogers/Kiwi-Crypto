import express from 'express'
import request from 'superagent'
import * as db from '../db/db.ts'
import { auth } from 'express-openid-connect'
import 'dotenv/config'
import knex from 'knex'
import checkJwt, { JwtRequest } from '../autho0.ts'

const router = express.Router()
const apiKey = process.env.CRYPTO_API_KEY

// const authConfig = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET, // A long, secret string to encrypt session cookies
//   baseURL: process.env.BASE_URL, // The base URL of your application
//   clientID: process.env.AUTH0_CLIENT_ID, // Your Auth0 application's Client ID
//   issuerBaseURL: process.env.AUTH0_DOMAIN, // Your Auth0 domain
// }

// router.use(auth(authConfig))

// Get api Data
router.get('/', async (req, res, next) => {
  try {
    const response = await request
      .get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .set('X-CMC_PRO_API_KEY', apiKey!)
      .query({ id: '1,1027,3,4,8,79,7', convert_id: '2802' })

    res.json(response.body.data)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// Add coin to portfolio
router.post('/portfolio', checkJwt, async (req, res) => {
  const { authO_id, id, name, quote } = req.body

  try {
    // const user = await db.getUserAuthId(authO_id)

    const coinExists = await db.checkPortfolioForCrypto(authO_id, id)
    if (coinExists) {
      res.sendStatus(201)
      return
    }

    const cryptoDetails = {
      authO_id: authO_id,
      coin_id: id,
      coin_name: name,
      price: quote[2802].price,
      percent_change_1h: quote[2802].percent_change_1h,
      percent_change_24h: quote[2802].percent_change_24h,
      percent_change_7d: quote[2802].percent_change_7d,
      market_cap: quote[2802].market_cap,
    }

    const crypto = await db.addCryptoToPortfolioWithPost(
      cryptoDetails.authO_id,
      cryptoDetails.coin_id,
      cryptoDetails.coin_name,
      cryptoDetails.price,
      cryptoDetails.percent_change_1h,
      cryptoDetails.percent_change_24h,
      cryptoDetails.percent_change_7d,
      cryptoDetails.market_cap,
    )

    res.status(201).json(crypto)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Gets portfolio coins
router.get('/portfolio', async (req, res, next) => {
  try {
    const portfolioCoins = await db.getAllCryptosInPortfolio()

    res.json(portfolioCoins)
  } catch (error) {
    console.error(error)
  }
})

// Check if authenticated and fetch their Id

router.post('/callback', checkJwt, async (req: JwtRequest, res) => {
  const authOId = req.auth?.sub as string

  // Check if user exists in db
  let user = await db.getUserAuthId(authOId)

  if (!user) {
    await knex('users').insert({
      authO_id: authOId,
    })

    user = await db.getUserAuthId(authOId)
  }

  res.sendStatus(200)
})

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    await db.deleteCoinFromPortfolioById(id)
    const getCryptos = await db.getAllCryptosInPortfolio()

    res.json({ cryptos: getCryptos })
  } catch (error) {
    next(error)
  }
})

// Delete coin from portfolio

// User Profile
// router.get('/profile', checkJwt, (req, res) => {
//   // req.oidc.user contains the user profile information
//   if (req.oidc.user) {
//     res.json(req.oidc.user)
//   } else {
//     res.status(401).send('User not authenticated')
//   }
// })

export default router
