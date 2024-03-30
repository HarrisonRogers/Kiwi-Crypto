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

router.use(auth(authConfig))

router.get('/callback', checkJwt, async (req, res) => {
  if (req.oidc.user) {
    const { sub: authOId } = req.oidc.user

    // Check if user exists in db
    const user = await db.getUserAuthId(authOId)

    if (!user) {
      await knex('users').insert({
        auhtO_id: authOId,
      })
    }

    res.redirect('/portfolio')
  } else {
    res.redirect('/')
  }
})

export default router
