import { useQuery } from '@tanstack/react-query'
import { getCryptosInPortfolio } from '../apis/cryptosApi'
import LoadingIndicator from './LoadingIndicator'
import { Cryptos } from '../../models/crypto'
import { Portfolio as CryptoData } from '../../models/dbModels'

export default function Portfolio() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['portfolio coins'],
    queryFn: () => getCryptosInPortfolio(),
  })

  if (isPending) {
    return <LoadingIndicator />
  }

  if (isError) {
    return (
      <>
        <h1>Error Loading Portfolio</h1>
      </>
    )
  }

  const portCryptos: CryptoData[] = data

  console.log(portCryptos)

  return (
    <div>
      <ul className="container">
        {portCryptos.map((coin) => (
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
