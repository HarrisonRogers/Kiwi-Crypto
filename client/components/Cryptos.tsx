import { useQuery } from '@tanstack/react-query'
import { getCrypto } from '../apis/cryptosApi'

export default function Cryptos() {
  const { data } = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getCrypto(),
  })

  return (
    <>
      <h1>Bitcoin -</h1>
      {data?.map((coin) => (
        <div key={coin.id}>
          <p>{coin.name}</p>
          <p>{coin.quote.USD.price}</p>
        </div>
      ))}
    </>
  )
}
