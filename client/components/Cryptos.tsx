import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'
import type { Cryptos } from '../../models/crypto'

export default function Cryptos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getCryptos(),
  })

  if (isPending) {
    return <p>Is Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }
  const keysArray = Object.keys(data)
  const dataArr = keysArray.map((key) => data[key] as Cryptos)

  return (
    <>
      <h1>Bitcoin -</h1>
      {dataArr.map((coin) => (
        <div key={coin.id}>
          <p>{coin.name}</p>
          <p>{coin.quote[2802].price}</p>
        </div>
      ))}
    </>
  )
}
