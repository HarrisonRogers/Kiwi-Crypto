/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import Nav from './components/Nav'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      {/* <Route index element={<Nav />} /> */}
    </Route>,
  ]),
)

export default router
