/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import Cryptos from './components/Cryptos'
import Portfolio from './components/Portfolio'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index element={<Cryptos />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Route>,
  ]),
)

export default router
