import { useQuery } from '@tanstack/react-query'
import { getCryptosInPortfolio } from '../apis/cryptosApi'
import LoadingIndicator from './LoadingIndicator'
import { Portfolio as CryptoData } from '../../models/dbModels'
import { useAuth0 } from '@auth0/auth0-react'
import DeleteButton from './DeleteButton'

export default function SinglePortfolioCoin() {
  const { user } = useAuth0()

  const { isPending, isError, data } = useQuery({
    queryKey: ['portfolio coin', user?.sub],
    queryFn: async () => {
      const allCoins = await getCryptosInPortfolio()
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

  console.log(uniqueCoinsArr)

  return (
    <>
      {uniqueCoinsArr.map((coin) => (
        <li key={coin.id}>
          <p>{coin.name}</p>
          <p>{coin.price.toFixed(3)}</p>
          <p>{coin.percent_change_1h.toFixed(2)}%</p>
          <p>{coin.percent_change_24h.toFixed(2)}%</p>
          <p>{coin.percent_change_7d.toFixed(2)}%</p>
          <p>{coin.market_cap.toFixed(0)}</p>
          <DeleteButton id={Number(coin.id)} />
        </li>
      ))}
    </>
  )
}
