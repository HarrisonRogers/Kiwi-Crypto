import express from 'express'
import request from 'superagent'
import * as db from '../db/db.ts'
import { auth } from 'express-openid-connect'
import 'dotenv/config'
import knex from 'knex'
import checkJwt from '../autho0.ts'

const router = express.Router()
const apiKey = process.env.CRYPTO_API_KEY

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET, // A long, secret string to encrypt session cookies
  baseURL: process.env.BASE_URL, // The base URL of your application
  clientID: process.env.AUTH0_CLIENT_ID, // Your Auth0 application's Client ID
  issuerBaseURL: process.env.AUTH0_DOMAIN, // Your Auth0 domain
}

router.use(auth(authConfig))

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
  const { authOId, coinId, coinName, amount } = req.body

  try {
    const user = await db.getUserAuthId(authOId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await knex('portfolios').insert({
      user_id: user.id,
      coin_id: coinId,
      coin_name: coinName,
      amount: amount,
    })

    res.status(201).json({ message: 'Coin added to portfolio' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Check if authenticated and fetch their Id

router.post('/callback', async (req, res) => {
  if (req.oidc.user) {
    const { sub: authOId } = req.oidc.user

    // Check if user exists in db
    let user = await db.getUserAuthId(authOId)

    if (!user) {
      await knex('users').insert({
        authO_id: authOId,
      })

      user = await db.getUserAuthId(authOId)
    }

    console.log(user)

    res.redirect('/portfolio')
  } else {
    res.redirect('/')
  }
})

// User Profile
router.get('/profile', checkJwt, (req, res) => {
  // req.oidc.user contains the user profile information
  if (req.oidc.user) {
    res.json(req.oidc.user)
  } else {
    res.status(401).send('User not authenticated')
  }
})

export default router
