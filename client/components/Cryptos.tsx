import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'

export default function Cryptos() {
  const { data } = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getCryptos(),
  })

  const bitcoinData = data?.find((coin) => coin.id === 1)
  const ethereumData = data?.find((coin) => coin.id === 1027)

  const newArr = [bitcoinData, ethereumData]

  console.log(bitcoinData, ethereumData)

  return (
    <>
      <h1>Bitcoin -</h1>
      {newArr.map((coin) => (
        <div key={coin.id}>
          <p>{coin.name}</p>
          <p>{coin.quote.NZD.price}</p>
        </div>
      ))}
    </>
  )
}
