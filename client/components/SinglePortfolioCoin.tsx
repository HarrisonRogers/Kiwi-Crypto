import { useQuery } from '@tanstack/react-query'
import { getCryptosInPortfolio } from '../apis/cryptosApi'
import LoadingIndicator from './LoadingIndicator'
import { Portfolio as CryptoData } from '../../models/dbModels'
import { useAuth0 } from '@auth0/auth0-react'
import DeleteButton from './DeleteButton'
import { useSearch } from '../contexts/searchContext'

export default function SinglePortfolioCoin() {
  const { user } = useAuth0()

  const { isPending, isError, data } = useQuery({
    queryKey: ['portfolio coin', user?.sub],
    queryFn: async () => {
      const allCoins = await getCryptosInPortfolio()
      return allCoins.filter((coin: CryptoData) => coin.authO_id == user?.sub)
    },
  })

  const { searchTerm } = useSearch()

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
  const filteredData = uniqueCoinsArr.filter((coin) => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="portfolio-coin">
      {filteredData.map((coin) => (
        <li className="list-coin" key={coin.id}>
          <div className="coin-name">
            <h1>{coin.name}</h1>
          </div>
          <div className="portfolio-layout">
            <div className="crypto-layout titles">
              <p>Price:</p>
              <p>1h Change:</p>
              <p>24h Change:</p>
              <p>7d Change:</p>
              <p>Market Cap: </p>
            </div>
            <div className="crypto-layout coin-details ">
              <h3>${coin.price.toFixed(3)}</h3>
              <h3>{coin.percent_change_1h.toFixed(2)}%</h3>
              <h3>{coin.percent_change_24h.toFixed(2)}%</h3>
              <h3>{coin.percent_change_7d.toFixed(2)}%</h3>
              <h3>${coin.market_cap.toFixed(0)}</h3>
            </div>
          </div>
          <DeleteButton id={Number(coin.id)} />
        </li>
      ))}
    </div>
  )
}
