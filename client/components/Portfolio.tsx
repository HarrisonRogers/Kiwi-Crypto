import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'
import type { Cryptos } from '../../models/crypto'
import LoadingIndicator from './LoadingIndicator'

export default function Portfolio() {
  return <h1>Welcome to the portfolio page</h1>
}
