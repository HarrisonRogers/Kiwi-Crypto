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
        <div className="crypto-layout titles">
          <p>Name:</p>
          <p>Price:</p>
          <p>24h Change:</p>
          <p>7d Change:</p>
        </div>
        <div className="cryptos">
          {dataArr.map((coin) => (
            <div key={coin.id} className="coin">
              <div className="crypto-layout">
                <h2>{coin.name}</h2>
                <p>
                  {' '}
                  {coin.quote[2802].price?.toFixed(3)
                    ? '$' + coin.quote[2802].price?.toFixed(3)
                    : 'No price available'}
                </p>
                <p>{coin.quote[2802].percent_change_24h.toFixed(2)}%</p>
                <p>{coin.quote[2802].percent_change_7d.toFixed(2)}%</p>
                <AddToPortfolioButton coin={coin} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
