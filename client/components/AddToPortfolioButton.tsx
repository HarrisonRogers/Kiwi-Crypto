import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addCryptoToPortfolio, getCryptos } from '../apis/cryptosApi'
import type { Cryptos } from '../../models/crypto'
import { useState } from 'react'
import { Portfolio } from '../../models/dbModels'

export default function AddToPortfolioButton() {
  const [addCrypto, setAddCrypto] = useState({
    id: '',
    name: '',
    price: 0,
    percent_change_1h: 0,
    percent_change_24h: 0,
    percent_change_7d: 0,
    market_cap: 0,
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (crypto: Portfolio) => addCryptoToPortfolio(crypto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio coins'] })
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(addCrypto)
  }
}
