import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'
import type { Crypto } from '../../models/crypto'
import LoadingIndicator from './LoadingIndicator'
import AddToPortfolioButton from './AddToPortfolioButton'
import { useSearch } from '../contexts/searchContext'

export default function Cryptos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getCryptos(),
  })
  const { searchTerm } = useSearch()

  if (isPending) {
    return <LoadingIndicator />
  }

  if (isError) {
    return <p>Error</p>
  }
  const keysArray = Object.keys(data)
  const dataArr = keysArray.map((key) => data[key] as Crypto)
  const filteredData = dataArr.filter((coin) => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (filteredData.length <= 0) {
    return (
      <div className="container">
        <h1 className="center">Can not find coin</h1>
      </div>
    )
  } else {
    return (
      <>
        <div className="container">
          <div className="crypto-layout titles">
            <p>Name:</p>
            <p>Price:</p>
            <p className="hide-on-mobile">24h Change:</p>
            <p className="hide-on-mobile">7d Change:</p>
          </div>
          <div className="cryptos">
            {filteredData.map((coin) => (
              <div key={coin.id} className="coin">
                <div className="crypto-layout">
                  <h2>{coin.name}</h2>
                  <p>
                    {' '}
                    {coin.quote[2802].price?.toFixed(2)
                      ? `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(coin.quote[2802].price)}`
                      : 'No price available'}
                  </p>
                  <p
                    className={
                      coin.quote[2802].percent_change_24h
                        .toFixed(2)
                        .includes('-')
                        ? 'red hide-on-mobile'
                        : 'green hide-on-mobile'
                    }
                  >
                    {coin.quote[2802].percent_change_24h.toFixed(2)}%
                  </p>
                  <p
                    className={
                      coin.quote[2802].percent_change_7d
                        .toFixed(2)
                        .includes('-')
                        ? 'red hide-on-mobile'
                        : 'green hide-on-mobile'
                    }
                  >
                    {coin.quote[2802].percent_change_7d.toFixed(2)}%
                  </p>
                  <AddToPortfolioButton coin={coin} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}
