import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'
import type { Cryptos } from '../../models/crypto'
import LoadingIndicator from './LoadingIndicator'
import AddToPortfolioButton from './AddToPortfolioButton'

export default function Cryptos() {
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ['cryptos'],
  //   queryFn: () => getCryptos(),
  // })

  // if (isPending) {
  //   return <LoadingIndicator />
  // }

  // if (isError) {
  //   return <p>Error</p>
  // }
  // const keysArray = Object.keys(data)
  // const dataArr = keysArray.map((key) => data[key] as Cryptos)

  const data = [
    {
      id: 1,
      name: 'Bitcoin',
      price: 110256.12,
      percent_change_24h: 10,
      market_cap: 15544554432,
    },
    {
      id: 2,
      name: 'Ethereum',
      price: 6000.12,
      percent_change_24h: 5,
      market_cap: 155445544,
    },
    {
      id: 3,
      name: 'Solana',
      price: 300,
      percent_change_24h: 15,
      market_cap: 3554555432,
    },
    {
      id: 4,
      name: 'Tether USDt',
      price: 1.6,
      percent_change_24h: 0.01,
      market_cap: 155445544323,
    },
  ]

  return (
    <>
      {/* <h1>Bitcoin -</h1>
      {dataArr.map((coin) => (
        <div key={coin.id}>
          <h2>{coin.name}</h2>
          <p>
            Current Price -{' '}
            {coin.quote[2802].price?.toFixed(3)
              ? coin.quote[2802].price?.toFixed(3)
              : 'No price available'}
          </p>
        </div>
      ))} */}
      <div className="container">
        {data.map((coin) => (
          <div key={coin.id}>
            <h2>{coin.name}</h2>
            <p>{coin.price}</p>
            <p>{coin.percent_change_24h}%</p>
            <p>{coin.market_cap}</p>
            {/* <AddToPortfolioButton /> */}
          </div>
        ))}
      </div>
    </>
  )
}
