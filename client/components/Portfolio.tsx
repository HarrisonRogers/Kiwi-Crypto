import { useQuery } from '@tanstack/react-query'
import { getCryptosInPortfolio } from '../apis/cryptosApi'
import LoadingIndicator from './LoadingIndicator'
import { Cryptos } from '../../models/crypto'
import { Portfolio as CryptoData } from '../../models/dbModels'
import { useAuth0 } from '@auth0/auth0-react'

export default function Portfolio() {
  const { user } = useAuth0()

  const { isPending, isError, data } = useQuery({
    queryKey: ['portfolio coins', user?.sub],
    queryFn: async () => {
      const allCoins = await getCryptosInPortfolio()
      console.log(allCoins)
      return allCoins.filter((coin: CryptoData) => coin.authO_id == user?.sub)
    },
  })

  if (isPending) {
    return <LoadingIndicator />
  }

  if (isError) {
    return <h1>Error Loading Portfolio</h1>
  }

  const portCryptos: CryptoData[] = data

  // Remove duplicates
  const uniqueCoins = new Map(portCryptos.map((coin) => [coin.id, coin]))
  const uniqueCoinsArr = Array.from(uniqueCoins.values())

  return (
    <div>
      <ul className="container">
        {uniqueCoinsArr.map((coin) => (
          <li key={coin.id}>
            <p>{coin.name}</p>
            <p>{coin.price}</p>
            <p>{coin.percent_change_1h}</p>
            <p>{coin.percent_change_24h}</p>
            <p>{coin.percent_change_7d}</p>
            <p>{coin.market_cap}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
