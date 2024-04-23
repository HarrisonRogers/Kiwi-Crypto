/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addCryptoToPortfolio,
  checkForCryptoInPortfolio,
} from '../apis/cryptosApi'
import { useAuth0 } from '@auth0/auth0-react'
import { Crypto } from '../../models/crypto'
import { Portfolio } from '../../models/dbModels'
import CircleLoadingIndicator from './CircleLoadingINdicator'

interface AddToPortfolioButtonProps {
  coin: Crypto
}

export default function AddToPortfolioButton({
  coin,
}: AddToPortfolioButtonProps) {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently, user } = useAuth0()

  // Check if data is already in portfolio
  const { data: isInPortfolio, isLoading } = useQuery({
    queryKey: ['checkPortfolio', user?.sub, coin.id],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return await checkForCryptoInPortfolio(
        token,
        String(user?.sub),
        String(coin.id),
      )
    },
    enabled: !!user?.sub,
  })

  // Post a crypto to portfolio
  const postMutation = useMutation({
    mutationFn: addCryptoToPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio coins'] })
      queryClient.setQueryData(['checkPortfolio', user?.sub, coin.id], true)
    },
  })

  // Handle submit button which gets access token to put in users own portfolio
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isInPortfolio) {
      try {
        const authO_id = user?.sub
        const token = await getAccessTokenSilently()
        const cryptoToAdd: Portfolio = {
          ...coin,
          authO_id,
          coin_id: coin.id.toString(),
          price: coin.quote[2802].price,
          percent_change_1h: coin.quote[2802].percent_change_1h,
          percent_change_24h: coin.quote[2802].percent_change_24h,
          percent_change_7d: coin.quote[2802].percent_change_7d,
          market_cap: coin.quote[2802].market_cap,
        }
        postMutation.mutate({ crypto: cryptoToAdd, token })
      } catch (error) {
        console.error('Error getting token: ', error)
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {isLoading ? (
          <CircleLoadingIndicator />
        ) : (
          <button className="port-btn">
            {' '}
            <i
              className={
                isInPortfolio
                  ? 'fa-solid fa-star star bg-orange'
                  : 'fa-solid fa-star star'
              }
            ></i>{' '}
          </button>
        )}
      </form>
    </>
  )
}
