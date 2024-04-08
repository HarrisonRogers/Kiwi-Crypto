import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'
import type { Crypto } from '../../models/crypto'
import LoadingIndicator from './LoadingIndicator'
import AddToPortfolioButton from './AddToPortfolioButton'

export default function Cryptos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getCryptos(),
  })

  if (isPending) {
    return <LoadingIndicator />
  }

  if (isError) {
    return <p>Error</p>
  }
  const keysArray = Object.keys(data)
  const dataArr = keysArray.map((key) => data[key] as Crypto)

  return (
    <>
      <div className="container">
        {dataArr.map((coin) => (
          <div key={coin.id}>
            <h2>{coin.name}</h2>
            <p>
              Current Price:{' '}
              {coin.quote[2802].price?.toFixed(3)
                ? coin.quote[2802].price?.toFixed(3)
                : 'No price available'}
            </p>
            <p>24h change: {coin.quote[2802].percent_change_24h.toFixed(3)}%</p>
            <p>7d change: {coin.quote[2802].percent_change_7d.toFixed(3)}%</p>
            <AddToPortfolioButton coin={coin} />
          </div>
        ))}
      </div>
    </>
  )
}
