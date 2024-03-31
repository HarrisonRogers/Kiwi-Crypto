import { useQuery } from '@tanstack/react-query'
import { getCryptosInPortfolio } from '../apis/cryptosApi'
import LoadingIndicator from './LoadingIndicator'
import { Cryptos } from '../../models/crypto'

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

  const portCryptos: Cryptos[] = data

  return (
    <div>
      <ul>
        {portCryptos.map((coin) => (
          <li key={coin.id}>
            <h2>{coin.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}
